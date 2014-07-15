define(function (require) {
  var html = require('text!apps/visualize/partials/config_category.html');

  require('apps/visualize/directives/config_editor');

  require('modules')
    .get('apps/visualize')
    .directive('visConfigCategory', function (Private) {

      return {
        restrict: 'E',
        scope: {
          category: '=',
          vis: '=',
          fields: '='
        },
        template: html,
        link: function ($scope, $el) {
          $scope.moveHandler = function (config, delta) {
            var configs = $scope.category.configs;
            var i = configs.indexOf(config);
            if (delta === false) {
              // means remove
              configs.splice(i, 1);
            } else {
              // move to a new position (iTarget)
              var iTarget = Math.max(0, Math.min(configs.length - 1, i + delta));
              if (i !== iTarget) {
                configs.splice(iTarget, 0, configs.splice(i, 1).pop());
              }
            }
          };
        }
      };
    });
});