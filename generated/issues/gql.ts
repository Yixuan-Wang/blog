export const gqlQueryIssues = `#graphql
query QueryIssues (
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
        labels(first: 10) {
          nodes {
            name
          }
        }
        updatedAt
        body
      }
    }
  }
}
`

export const gqlQueryComments = `#graphql
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
}`
