import * as types from '../mutation-types'

const mutations = {

  /* ASIDE */
  [types.ADD_ASIDE_CONTENT] (state, data) {
    state.visual_editor.aside.push({
      type: data.type
    })
  },
  [types.REMOVE_ASIDE_CONTENT] (state, data) {
    state.visual_editor.aside.splice(data.i, 1)
  },
  [types.MOVE_UP_ASIDE_CONTENT] (state, data) {
    if (data.i !== 0) {
      let tempArr = state.visual_editor.aside
      const temp = tempArr[data.i]
      tempArr[data.i] = tempArr[data.i - 1]
      tempArr[data.i - 1] = temp
      state.visual_editor.aside = [...tempArr]
    }
  },
  [types.MOVE_DOWN_ASIDE_CONTENT] (state, data) {
    if (data.i !== state.visual_editor.aside.length - 1) {
      let tempArr = state.visual_editor.aside
      const temp = tempArr[data.i]
      tempArr[data.i] = tempArr[data.i + 1]
      tempArr[data.i + 1] = temp
      state.visual_editor.aside = [...tempArr]
    }
  },
  [types.ADD_FAQ] (state, data) {
    let temp = state.visual_editor.aside
    if (!temp[data.i].faqs) {
      temp[data.i].faqs = []
    }
    temp[data.i].faqs.push({
      q: data.q,
      a: data.a
    })
    state.visual_editor.aside = [...temp]
  },
  [types.REMOVE_FAQ] (state, data) {
    let temp = state.visual_editor.aside
    temp[data.i].faqs.splice(data.faq_i, 1)
    state.visual_editor.aside = [...temp]
  },
  [types.ADD_SOCIAL] (state, data) {
    let newSocial = {
      url: data.url,
      icon: null
    }
    if (data.url.indexOf('instagram') >= 0) newSocial.icon = 'instagram'
    else if (data.url.indexOf('twitter') >= 0) newSocial.icon = 'twitter'
    else if (data.url.indexOf('facebook') >= 0) newSocial.icon = 'facebook'
    else if (data.url.indexOf('youtube') >= 0) newSocial.icon = 'youtube'

    let temp = state.visual_editor.aside
    if (!temp[data.i].socials) {
      temp[data.i].socials = []
    }
    temp[data.i].socials.push(newSocial)
    state.visual_editor.aside = [...temp]
  },
  [types.REMOVE_SOCIAL] (state, data) {
    let temp = state.visual_editor.aside
    temp[data.i].socials.splice(data.social_i, 1)
    state.visual_editor.aside = [...temp]
  },

  /* MAIN */
  [types.ADD_LARGE_IMAGE] (state, data) {
    let temp = state.visual_editor.main
    if (!temp[data.i].image) {
      temp[data.i].image = ''
    }
    temp[data.i].image = data.url
    state.visual_editor.main = [...temp]
  },
  [types.REMOVE_LARGE_IMAGE] (state, data) {
    let temp = state.visual_editor.main
    temp[data.i].image = null
    state.visual_editor.main = [...temp]
  },
  [types.ADD_PERFORMER] (state, data) {
    let temp = state.visual_editor.main
    if (!temp[data.i].performers) {
      temp[data.i].performers = []
    }
    temp[data.i].performers.push(data.performer)
    state.visual_editor.main = [...temp]
  }
}

export default {
  mutations
}
