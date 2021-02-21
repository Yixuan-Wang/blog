const axios = require('axios');

const LIMIT = 50;

const queryIssues = `#graphql
query GHQueryIssues (
    $owner: String!,
    $repo: String!,
    $labels: [String!],
    $after: String,
    $limit: Int,
) {
  repository(owner: $owner, name: $repo) {
    issues(
      first: $limit,
      after: $after,
      filterBy: { createdBy: $owner, states: OPEN, labels: $labels }
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        title
        id
        number
        labels(first: 10) {
          nodes {
            name
          }
        }
        lastEditedAt
        body
      }
    }
  }
}`;

const queryComments = `#graphql
query GHQueryComments (
    $owner: String!,
    $repo: String!,
    $number: Int!,
    $after: String,
    $limit: Int,
) {
  repository(owner: $owner, name: $repo) {
    issue(number: $number) {
      comments(after: $after, first: $limit) {
        nodes {
          body
          authorAssociation
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}`;

const query = async (query, variables) => {
  let response;
  try {
    response = await axios({
      method: 'post',
      url: 'https://api.github.com/graphql',
      data: { query, variables },
      headers: {
        Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
  } catch (error) {
    if (error.response) console.error(error.response.data);
    else console.error(error.message);
    throw error;
  }

  if (response.data.errors) {
    console.error(response.data.errors);
    throw response.data.errors[0].message;
  }

  return response.data.data;
};

async function getIssues(configSourceIssues) {
  const getPageIssues = async (after = null) => {
    const variables = {
      ...configSourceIssues,
      limit: LIMIT,
      after,
    };

    const data = await query(queryIssues, variables);
    return data.repository.issues;
  };

  let after = null;
  let issues = [];
  let pageIssues;
  do {
    pageIssues = await getPageIssues(after);
    issues = issues.concat(pageIssues.nodes);
    after = pageIssues.pageInfo.endCursor;
  } while (pageIssues.pageInfo.hasNextPage);

  return issues;
}

async function getComments({ owner, repo }, number) {
  const getPageComments = async (after = null) => {
    const variables = {
      owner,
      repo,
      number,
      limit: LIMIT,
      after,
    };

    const data = await query(queryComments, variables);
    return data.repository.issue.comments;
  };

  let after = null;
  let comments = [];
  let pageComments;
  do {
    pageComments = await getPageComments(after);
    comments = comments.concat(
      pageComments.nodes?.filter(
        comment => comment.authorAssociation === 'OWNER',
      ),
    );
    after = pageComments.pageInfo.endCursor;
  } while (pageComments.pageInfo.hasNextPage);

  return comments;
}

const parseLabel = labels => {
  let quarter;
  for (label of labels) {
    if (label.startsWith('@') && !quarter) quarter = label.slice(1);
  }

  return {
    quarter,
  };
};

exports.sourceIssues = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const configSourceIssues = {
    owner: `Yixuan-Wang`,
    repo: `blog-contents`,
    labels: [process.env.ONLY_KEY_ISSUES ? `++` : `+`],
  };

  const issues = await getIssues(configSourceIssues);
  for (issue of issues) {
    const labels = issue.labels.nodes.map(node => node.name);
    issue.labels = labels; // Flatten labels:Object to labels:Array
    const id = createNodeId(`issues-${issue.id}`);
    delete issue.id;

    const parsedLabel = parseLabel(labels);

    let content;
    if (parsedLabel?.quarter === 'talks') {
      const comments = await getComments(configSourceIssues, issue.number);
      content =
        issue.body +
        comments
          .map(comment => comment.body)
          .join('\n<hr class="talk-separator" />\n\n');
      delete issue.body;
    } else {
      content = issue.body;
      delete issue.body;
    }

    createNode({
      id,
      parent: null,
      children: [],
      internal: {
        mediaType: 'text/markdown',
        type: 'Issues',
        content,
        contentDigest: createContentDigest(issue),
        description: `${configSourceIssues.owner}/${configSourceIssues.repo} #${issue.number}`,
      },
      ...issue,
      ...parsedLabel,
    });
  }
};
