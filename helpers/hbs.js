const moment = require('moment');

module.exports = {
    formatDate : (date, format) => {
        return moment(date).format(format);
    },
    truncate: function (str) {
        if (str.length > 140 && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, 140)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, 140)
          return new_str + '...'
        }
        return str
      },
      stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
      },
      editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },
      select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
}