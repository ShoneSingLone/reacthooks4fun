import $ from "jquery";
import _ from "lodash";
import { logError } from "l_common/log";

const METHODS = {
  POST: "POST",
  GET: "GET",
};

const ajaxOptions = (options, customOptions) => {
  /* 
  const data = ((isPost) => {
    if (isPost) {
      return JSON.stringify(options.data || {});
    } else {
      if (_.isString(options.data)) {
        return options.data;
      }
      if (_.isPlainObject(options.data)) {
        return _.map(options.data, (value, key) => `${key}=${value}`).join("&");
      }
    }
  })(options.type === METHODS.POST); 
  */

  return _.merge(
    {
      async: true,
      dataType: "json",
      statusCode: {
        404: () => {
          logError("statusCode 404");
        },
        0: () => {
          logError("statusCode 0");
        },
      },
    },
    options,
    customOptions,
  );
};

/* https://api.jquery.com/jQuery.ajax/ */
export const ajax = {
  get: (url, options) =>
    new Promise((resolve, reject) =>
      $.ajax(
        ajaxOptions(
          {
            type: METHODS.GET,
            url,
            success: resolve,
            error: reject,
          },
          options
        )
      )
    ),
  post: (url, options) =>
    new Promise((resolve, reject) =>
      $.ajax(
        ajaxOptions(
          {
            type: METHODS.POST,
            url,
            success: resolve,
            error: reject,
          },
          options
        )
      )
    ),
};
