import { text_area,string,label,any,div,Widget,Action, navLink, nav, button_wrapper, span, unorderedList, hn } from 'widgets-for-react'
import { AppState, Article, ArticlePreview } from './state';

export const notes = (s0:AppState) =>
  div<Action<AppState>>({ key:`notes`, className:"footer", style:{ position:"absolute", bottom:"0px", width:"100%", height:"65px", backgroundColor:"#f5f5f5" } })(
    div<Action<AppState>>({ className:"container" })(
      div<Action<AppState>>({ className:"row form-group" })(
        label<Action<AppState>>("My notes", { key:"notes-label", label_position:"before", htmlFor:"notes", className:"col-sm-3 col-form-label" })(
          div<Action<AppState>>({ key:`notes-text`, className:"col-sm-9" })(
            text_area({ id:"notes", columns:55, className:"form-control" })(s0.permanentText).map<Action<AppState>>(pt => s => ({...s, permanentText:pt}))
          )
        ),
      )
    )
  )


export const articles = () => (articles: Array<ArticlePreview>): Widget<never> =>
  div({ key:`articles`,  className: 'container' })(
    div({ className: 'card-deck' })(
      articles.map(a =>
        div({ className: `card mb-3` })(
          any({ key:`article-card-body` })([
            navLink(
              div({ className: 'card-body' })(
                hn(4, a.title, { className: 'card-title' })()
              ).never(),
              `/stateful_routing/articles/${a.id}`)
          ])
        )
      )
    )
  ).never()


export const article = () => (article: Article): Widget<never> =>
  div({ key:`article`, className: "container" })(
    div({ className: "row" })(
      div({ className: "col" })([
        hn(2, article.title)(),
        string({ readonly: true, readonly_element: "p" })(article.content),
      ])
    )
  ).never()


export const navbar = (s0:AppState) => (articlePreviews:Array<ArticlePreview>) : Widget<never> =>
  nav({ key:`navbar`, id:"navbar-example2", className:"navbar navbar-expand-lg navbar-light bg-light" })(
    any()([
        navLink("Articles", "/stateful_routing/articles", { className:"navbar-brand", key:"articles-link" }),
        navLink("Form", "/stateful_routing/form", { className:"navbar-brand", key:"articles-link" }),
        button_wrapper(
          span({ className:"navbar-toggler-icon" })(),
            {
              key:"navbar-toggler",
              className:"navbar-toggler",
              extraProperties:{ "type":"button", "data-toggle":"collapse", "data-target":"#navbarSupportedContent",
                "aria-controls":"navbarSupportedContent", "aria-expanded":"false", "aria-label":"Toggle navigation"
            }
          })(() => ({})),
        div({ className:"collapse navbar-collapse", id:"navbarSupportedContent", key:"collapsible-articles-menu" })(
        unorderedList({ className:"navbar-nav ml-auto"})(
            articlePreviews.map(a =>
            ({
              options:{
                className:`nav-item dropdown ${a && s0.route.kind == "article" && a.id == s0.route.id ? "active" : ""}`,
                key:`article-link-/stateful_routing/articles/${a.id}`
              },
              widget:
                  navLink(`${a.title}`, `/stateful_routing/articles/${a.id}`,
                    { className:"nav-link", role:"button" }),
            })
          )
        )
      )
    ])
  ).never()

export const articleLoading : Widget<never> =
  string({ key:"article-loading", readonly:true, readonly_element:"p", className:`alert alert-info`, style:{ position:"fixed", left:"15px", top:"15px" } })("Loading...").never()

export const connectionError : Widget<never> =
  string({ key:"connection-error", readonly:true, readonly_element:"p", className:`alert alert-danger`, style:{ position:"fixed", left:"15px", top:"15px" } })("Connection error, retrying...").never()

export const notFound : Widget<never> =
  div({ className:"container", key:"not-found" })(
    div({ className:"jumbotron" })(
      hn(1, "Not found")(
        string({ readonly:true, readonly_element:"p" })("The url you typed does not correspond to a page, please check the url and try again.")
      )
    )
  ).never()
