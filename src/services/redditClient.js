import _ from 'lodash';
import crypto from 'crypto';

import Fetch from 'isomorphic-fetch';

const API_ENDPOINT_PATTERN = 'https://www.reddit.com/r/$1/new.json?raw_json=1';
const PERMALINK_BASE = 'https://reddit.com';
const ERROR_BAD_RESPONSE = 'Bad response from server';
const ERROR_INVALID_JSON = 'Bad response format';

let first = true;

export function fetchNewPostsInSubreddit(subreddit) {
  //return fakeFetchNewPostsInSubreddit(subreddit);

  return fetch(
    subreddit.replace(/(.*)/, API_ENDPOINT_PATTERN),
    {headers: {'Cache-Control': 'no-cache'}}
  )
    .then((response) => {
      if (response.status != 200) {
        throw new Error(ERROR_BAD_RESPONSE);
      }

      return response.json();
    })
    .then((jsonResponse) => {
      return parseRedditPosts(jsonResponse);
    });
}

function fakeFetchNewPostsInSubreddit(subreddit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stubA = require('services/redditStubA.json');
      const stubB = require('services/redditStubB.json');
      resolve(parseRedditPosts(first ? stubA : stubB));
      first = !first;
    }, 200);
  });
}

function parseRedditPosts(json) {
  if (!json || !json.data || !json.data.children || !Array.isArray(json.data.children)) {
    throw new Error(ERROR_INVALID_JSON);
  }

  return json.data.children.map(parseRedditPost);
}

function parseRedditPost(json) {
  if (!json.data || !json.data.id) {
    throw new Error(ERROR_INVALID_JSON);
  }

  let url;
  let images = [];

  if (!json.data.url.includes(json.data.permalink)) {
    url = json.data.url;
  }

  if (json.data.preview) {
    images = json.data.preview.images.map((image) => image.source.url);
  }

  const shortPost = {
    title: json.data.title,
    url: url,
    images: images,
    body: json.data.selftext,
  };

  const hash = crypto.createHash('md5').update(JSON.stringify(shortPost)).digest('base64');

  return _.merge({
    id: json.data.id,
    author: json.data.author,
    date: json.data.created_utc,
    permalink: PERMALINK_BASE + json.data.permalink,
    commentsCount: json.data.num_comments,
    upVotes: json.data.ups,
    downVotes: json.data.downs,
    score: json.data.score,
    category: json.data.link_flair_text,
    hash: hash,
    raw: json.data,
  }, shortPost);
}
