import { Action, any, async, browserRouter, onlyIf, stateful, unloadedAsyncState } from 'widgets-for-react';
import { router } from './routes';
import { AppState, Article, ArticlePreview, initialState, setAppStateRoute, storeNewArticle, storeNewArticlePreviews } from './state';
import { article, articleLoading, articles, connectionError, navbar, notes, notFound } from './views';
import { app } from '../app'

export const statefulRouter =
  stateful<AppState>()(s0 =>
    browserRouter<Action<AppState>>()(
      any<Action<AppState>>({ key:`app-container` })([

      
        async<Array<ArticlePreview>>(
          articlePreviews =>
            any({ key:`articles-content` })([
              navbar(s0)(articlePreviews),
              onlyIf(s0.route.kind == "articles", articles()(articlePreviews).never())
            ]).never(),
          {
            key:"articles-loader",
            loading:_ => articleLoading,
            connectionError:connectionError,
            otherError:notFound
          }
        )(s0.articlePreviews).map<Action<AppState>>(a => s => storeNewArticlePreviews(a(s.articlePreviews))(s)),

        async<Article>(
          a => onlyIf(s0.route.kind == "article", article()(a).never()),
          {
            key:"article-loader",
            loading:_ => articleLoading,
            connectionError:connectionError,
            otherError:notFound
          }
        )(s0.article).map<Action<AppState>>(a => s => storeNewArticle(a(s.article))(s)),

        router(s0).map<Action<AppState>>(route => s => setAppStateRoute(s, route)),
        
        onlyIf(s0.route.kind == "404", notFound).never(),
        
        onlyIf(s0.route.kind == 'form', app(s0.form).map(form => s1 => ({...s1, form}))),
        notes(s0),
      ])
    ).map(a => a(s0))
  )(initialState()).never()
/**
 * kind: 404 ? notfound : articles 
 * 
 */