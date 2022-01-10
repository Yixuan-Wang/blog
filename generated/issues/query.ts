import axios from 'axios'
import { gqlQueryComments, gqlQueryIssues } from './gql'

const LIMIT = 50

const query = async(query: any, variables: any) => {
  let response
  try {
    response = await axios({
      method: 'post',
      url: 'https://api.github.com/graphql',
      data: { query, variables },
      headers: {
        Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
  }
  catch (error: any) {
    if (error.response) console.error(error.response.data)
    else console.error(error.message)
    throw error
  }

  if (response.data.errors) {
    console.error(response.data.errors)
    throw response.data.errors[0].message
  }

  return response.data.data
}

export interface ConfigSourceIssues {
  owner: string
  repo: string
  labels: string[]
}

interface IssuesMeta {
  title: string
  id: string
  number: number
  updatedAt: string
  body: string
}

export interface IssuesRaw extends IssuesMeta {
  labels: {
    nodes: {
      name: string
    }[]
  }
}

export interface Issues extends IssuesMeta {
  labels: string[]
}

interface Response<Raw> {
  pageInfo: {
    hasNextPage: boolean
    endCursor: number | null
  }
  nodes: Raw[]
}

export async function getIssues(configSourceIssues: ConfigSourceIssues) {
  const getPageIssues = async(after: number | null = null): Promise<Response<IssuesRaw>> => {
    const variables = {
      ...configSourceIssues,
      limit: LIMIT,
      after,
    }

    const data = await query(gqlQueryIssues, variables)
    return data.repository.issues
  }

  let after: number | null = null
  let issues: Issues[] = []
  let pageIssues: Response<IssuesRaw>
  do {
    pageIssues = await getPageIssues(after)
    issues = issues.concat(pageIssues.nodes.map((node) => {
      return {
        ...node,
        labels: node.labels.nodes.map(({ name }) => name),
      }
    }))
    after = pageIssues.pageInfo.endCursor
  } while (pageIssues.pageInfo.hasNextPage)

  return issues
}

interface Comments {
  body: string
  authorAssociation: string
}

export async function getComments({ owner, repo }: {owner: string; repo: string}, number: number) {
  const getPageComments = async(after: number | null = null): Promise<Response<Comments>> => {
    const variables = {
      owner,
      repo,
      number,
      limit: LIMIT,
      after,
    }

    const data = await query(gqlQueryComments, variables)
    return data.repository.issue.comments
  }

  let after: number | null = null
  let comments: Comments[] = []
  let pageComments: Response<Comments>
  do {
    pageComments = await getPageComments(after)
    comments = comments.concat(
      pageComments.nodes?.filter(
        (comment: { authorAssociation: string }) => comment.authorAssociation === 'OWNER',
      ),
    )
    after = pageComments.pageInfo.endCursor
  } while (pageComments.pageInfo.hasNextPage)

  return comments
}

export const parseLabel = (labels: string[]) => {
  let genre: string | null = null
  let format = 'md'
  const directives: Record<string, boolean> = {}
  for (const label of labels) {
    if (label.startsWith('@') && !genre) genre = label.slice(1)
    if (label.startsWith('=')) format = label.slice(1)
    if (label.startsWith('%')) directives[label.slice(1)] = true
  }

  return {
    genre: genre ?? 'others',
    format,
    directives,
  }
}
