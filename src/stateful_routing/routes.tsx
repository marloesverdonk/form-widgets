import { notFoundRouteCase, route, routerSwitch } from "widgets-for-react";
import { AppState, RouteParams } from "./state";

export const router = (s0:AppState) =>
  routerSwitch<RouteParams>({ key:`router-switch` })([
    route<{ id:string }, RouteParams>(
      "/stateful_routing/articles/:id",
      a => ({...a, kind:"article" })
    ),
    route<{}, RouteParams>(
      "/stateful_routing",
      () => ({ kind: "articles" })
    ),
    route<{}, RouteParams>(
      "/stateful_routing/articles",
      () => ({ kind: "articles" })
    ),
    route<{}, RouteParams>(
      "/stateful_routing/form",
      () => ({ kind: 'form'})
    ),
    notFoundRouteCase<RouteParams>(
      () => ({ kind: "404" })
    )
  ])//.filter(route => isRouteChanged(s0.route, route))
