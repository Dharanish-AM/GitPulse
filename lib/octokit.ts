import { Octokit } from "octokit";
import { graphql } from "@octokit/graphql";

export const createOctokit = (token: string) => new Octokit({ auth: token });

export const createGraphQL = (token: string) =>
  graphql.defaults({ headers: { authorization: `token ${token}` } });

export async function getRateLimit(octokit: Octokit) {
  const { data } = await octokit.request("GET /rate_limit");
  return {
    remaining: data.resources.core.remaining,
    limit: data.resources.core.limit,
    resetAt: new Date(data.resources.core.reset * 1000).toISOString(),
  };
}