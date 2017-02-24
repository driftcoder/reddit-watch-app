import _ from 'lodash';
import crypto from 'crypto';

import Fetch from 'isomorphic-fetch';

const API_ENDPOINT_PATTERN = 'https://www.reddit.com/r/$1/new.json';
const PERMALINK_BASE = 'https://reddit.com';
const ERROR_BAD_RESPONSE = 'Bad response from server';
const ERROR_INVALID_JSON = 'Bad response format';

let first = true;

export function fetchNewPostsInSubreddit(subreddit) {
  //return fakeFetchNewPostsInSubreddit(subreddit);

  return fetch(subreddit.replace(/(.*)/, API_ENDPOINT_PATTERN))
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
    }, 10);
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
    images = json.data.preview.images.map((image) => _.unescape(image.source.url));
  }

  return {
    id: json.data.id,
    author: json.data.author,
    date: json.data.created_utc,
    title: _.unescape(json.data.title),
    permalink: _.unescape(PERMALINK_BASE + json.data.permalink),
    commentsCount: json.data.num_comments,
    upVotes: json.data.ups,
    downVotes: json.data.downs,
    score: json.data.score,
    url: _.unescape(url),
    images: images,
    category: json.data.link_flair_text,
    body: _.unescape(json.data.selftext),
    hash: crypto.createHash('md5').update(json.data.selftext).digest('base64'),
    raw: json.data,
  };
}
