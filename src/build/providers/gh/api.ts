interface FetchParams<V> {
  accessToken: string
  variables: V
}

interface GhPageInfo {
  endCursor: string | null
  hasNextPage: boolean
}

interface GhNodes<T> {
  nodes: T[]
}

interface GhResponseData<T> {
  data: T
}

export interface GhIssue {
  title: string
  id: string
  number: number
  labels: GhNodes<{
    name: string
  }>
  updatedAt: string
  body: string
}

export interface GhComment {
  authorAssociation: string
  body: string
}

const GITHUB_API_ENDPOINT = "https://api.github.com/graphql";

async function fetchFromGh<V, R>(query: string, {
  accessToken,
  variables,
}: FetchParams<V>): Promise<GhResponseData<R>> {
  return (
    await fetch(GITHUB_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  ).json() as Promise<GhResponseData<R>>;
}

const queryAllIssue = (p: FetchParams<{
  owner: string
  repo: string
  labels: string[]
  after: string | null
  limit: number
}>): Promise<GhResponseData<{
  repository: {
    issues: {
      pageInfo: GhPageInfo
    } & GhNodes<GhIssue>
  }
}>> => fetchFromGh(`#graphql
query (
    $owner: String!,
    $repo: String!,
    $labels: [String!],
    $after: String,
    $limit: Int!,
) {
  repository(owner: $owner, name: $repo) {
    issues(
      first: $limit,
      after: $after,
      filterBy: { 
        createdBy: $owner,
        states: OPEN,
        labels: $labels
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        title
        id
        number
        labels(first: 30) {
          nodes {
            name
          }
        }
        updatedAt
        body
      }
    }
  }
}`, p);

const queryAllComment = (p: FetchParams<{
  owner: string
  repo: string
  number: number
  after: string | null
  limit: number
}>): Promise<GhResponseData<{
  repository: {
    issue: {
      comments: {
        pageInfo: GhPageInfo
      } & GhNodes<GhComment>
    }
  }
}>> => fetchFromGh(`#graphql
query (
    $owner: String!,
    $repo: String!,
    $number: Int!,
    $after: String,
    $limit: Int!,
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
}`, p);

const queryOneIssue = (p: FetchParams<{
  owner: string
  repo: string
  number: number
}>): Promise<GhResponseData<{
  repository: {
    issue: {
      body: string
    }
  }
}>> => fetchFromGh(`#graphql
query (
  $owner: String!,
  $repo: String!,
  $number: Int!,
) {
  repository(owner: $owner, name: $repo) {
    issue(number: $number) {
      body
    }
  }
}`, p);

/* const queryAllComment = (variables: {
  owner: string;
  repo: string;
  number: number;
  after?: string;
  limit?: number;
}) => ({
  variables,
  query: `#graphql
  query QueryComments (
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
  }`,
});

const queryOneIssue = (variables: {
  owner: string;
  repo: string;
  number: number;
}) => ({
  variables,
  query: `#graphql
  query QueryIssue (
    $owner: String!,
    $repo: String!,
    $number: Int!,
  ) {
    repository(owner: $owner, name: $repo) {
      issue(number: $number) {
        body
      }
    }
  }`,
}); */

const api = {
  queryAllIssue,
  queryAllComment,
  queryOneIssue,
};

export default api;
