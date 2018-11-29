function extractHash(url, defaultValue) {
  if (url == null) {
    return defaultValue
  }
  const index = url.indexOf("#")
  return index !== -1 ? url.substr(index) : defaultValue
}

export default {
  state: {
    pathname: extractHash(location.href, "#/"),
    previous: undefined
  },
  actions: {
    go: function(hash) {
      location.hash = `#${hash}`
    },
    set: function(state) {
      return state
    }
  },
  subscribe: function(actions) {
    function handleHashChange(e) {
      actions.set({
        pathname: extractHash(e.newURL, "#/"),
        previous: extractHash(e.oldURL)
      })
      scrollTo(0, 0)
    }
    addEventListener("hashchange", handleHashChange)
    return function() {
      removeEventListener("hashchange", handleHashChange)
    }
  }
}
