import { Map } from 'immutable';
import { AsyncState, loadedAsyncState, loadingAsyncState, unloadedAsyncState } from 'widgets-for-react';
import { getArticle, getArticles } from './api';
import { State } from '../app'


export interface ArticlePreview { id: string, title: string }
export interface Article extends ArticlePreview { content: string }


export type RouteParams =
  { kind: "article", id: string }
  | { kind: "articles" }
  | { kind: "404" }
  | { kind: "form" }

export const isRouteChanged = (oldRoute: RouteParams, newRoute: RouteParams) =>
  oldRoute.kind != newRoute.kind ||
  (newRoute.kind == "article" && oldRoute.kind == "article" && newRoute.id != oldRoute.id)

export type AppState = {
  permanentText: string,
  fullArticleCache: Map<string, Article & { loadedAt: Date }>
  articlePreviews: AsyncState<Array<ArticlePreview>>
  article: AsyncState<Article>
  form: State

  route: RouteParams
}

export const setAppStateRoute = (state: AppState, route: RouteParams) => {
  if (route.kind == "article") {
    let fullArticleCache = state.fullArticleCache
    if (fullArticleCache.has(route.id)) {
      if ((Date.now() - fullArticleCache.get(route.id)!.loadedAt.valueOf()) / 1000 <= 30)
        return {
          ...state,
          fullArticleCache: fullArticleCache,
          route: route,
          article: loadedAsyncState(fullArticleCache.get(route.id)!)
        }
      else
        fullArticleCache = fullArticleCache.remove(route.id)
    }
    return {
      ...state,
      route: route,
      fullArticleCache: fullArticleCache,
      article: loadingAsyncState(() => getArticle(route.id))
    }
  } else {
    return { ...state, route: route }
  }
}

export const storeNewArticle = (newArticle: AsyncState<Article>) => (s: AppState): AppState => {
  return ({
    ...s, article: newArticle,
    fullArticleCache: newArticle.kind == "loaded" ?
      s.fullArticleCache.set(newArticle.value.id,
        {
          ...newArticle.value,
          loadedAt: new Date(Date.now())
        })
      : s.fullArticleCache
  })
}

export const storeNewArticlePreviews = (newArticlePreviews: AsyncState<Array<ArticlePreview>>) => (s: AppState): AppState => {
  return ({ ...s, articlePreviews: newArticlePreviews })
}

export const initialState = (): AppState => ({
  permanentText: "",
  article: unloadedAsyncState(),
  articlePreviews: loadingAsyncState(() => getArticles()),
  fullArticleCache: Map(),
  route: { kind: "articles" },
  form: {
    step: 'first', AsyncState: unloadedAsyncState(),
    emailData: { email: "", password: "", confirmPassword: "", showPassword: false },
    addressData: { street: "", number: "", postalCode: "", city: "", termsAccepted: false }
  }
})
