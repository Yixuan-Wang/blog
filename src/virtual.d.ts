declare module '*/friends.yaml' {
  export interface Friend {
    name: string
    avatar: string
    blog: string
    link: string
  }

  export const friends: Friend[]
}
