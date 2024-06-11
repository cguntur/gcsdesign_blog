module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },

    user_can_edit: ("user_can_edit", function (user_id, logged_in_user_id, options){
      if(user_id == logged_in_user_id){
        return options.fn(this);
      }
      return options.inverse(this);
    }),

  };

