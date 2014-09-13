
angular.module('page', ['bootstrap.tabset'])
    .controller('storeCtrl', function ($scope, $http) {
        $scope.shirts = [
            'shirt-flugzeugschwarz',
            'shirt-flugzeugblauweiss',
            'shirt-hubschrauber',
            'shirt-micro',
            'shirt-logo'];
        $scope.fields = {}; // initialize form fields

        // Form submit handler.
        $scope.submit = function(form) {
            // Trigger validation flag.
            $scope.submitted = true;

            // If form is invalid, return and let AngularJS show validation errors.
            if (form.$invalid) {
                console.log('invalid');
                return;
            }
            else {

                var message = '';

                angular.forEach($scope.fields, function(value, key) {
                    console.log(key+value);
                    message += key + ': ' + value + '\n';
                    $scope.fields[key] = '';
                });

                $http({
                    method: 'POST',
                    url: '/send-mail',
                    data: $.param({message: message, subject: 'Kontakt'}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function() {
                    $scope.sent = true;
                    $scope.send_error = false;
                    $scope.submitted = false;
                }).error(function() {
                    $scope.sent = false;
                    $scope.send_error = true;
                    $scope.submitted = false;
                });
            }
        };
    })
    .controller('contactCtrl', function ($scope, $http) {

        // Form submit handler.
        $scope.submit = function(form) {
            // Trigger validation flag.
            $scope.submitted = true;

            $http({method: 'GET', url: '/'}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('YES!!!');
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            // If form is invalid, return and let AngularJS show validation errors.
            if (form.$invalid) {
                console.log('invalid');
            }
            else {

                var message = '';

                angular.forEach($scope.fields, function(value, key) {
                    console.log(key+value);
                    message += key + ': ' + value + '\n';
                    $scope.fields[key] = '';
                });

                $http({
                    method: 'POST',
                    url: '/send-mail',
                    data: $.param({message: message, subject: 'Kontakt'}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function() {
                    $scope.sent = true;
                    $scope.send_error = false;
                    $scope.submitted = false;
                }).error(function() {
                    $scope.sent = false;
                    $scope.send_error = true;
                    $scope.submitted = false;
                });
            }
        };
    });
