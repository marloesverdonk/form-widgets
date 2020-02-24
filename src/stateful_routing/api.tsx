import {Chance} from 'chance';
import { Map } from 'immutable';
import { HttpResult } from 'widgets-for-react'
import { Article, ArticlePreview } from './state';

const chance = Chance()
const articles = Map<string, Article>().set(
  "1", { id:"1", title:chance.city(), content:chance.paragraph() })
.set(
  "2", { id:"2", title:chance.city(), content:chance.paragraph() })
.set(
  "3", { id:"3", title:chance.city(), content:chance.paragraph() })
.set(
  "4", { id:"4", title:chance.city(), content:chance.paragraph() })

export const getArticle = (id:string) : Promise<HttpResult<Article>> => new Promise((res,rej) => {
  if (Math.random() <= 0.3)
    return setTimeout(() =>
      articles.has(id) ?
        res({ kind:"result", value:articles.get(id)!, status:200 })
      : res({ kind:"failed", status:200 })
      , 500)
  else return setTimeout(() =>
      rej("Connection error"), 500)
})

export const getArticles = () : Promise<HttpResult<Array<ArticlePreview>>> => new Promise((res,rej) => {
  if (Math.random() <= 0.7)
    return setTimeout(() =>
      res({ kind:"result",
        value:articles.valueSeq().map(a => ({id:a.id, title:a.title})).toArray(), status:200 }),
        500)
  else return setTimeout(() =>
      rej("Connection error"), 500)
})