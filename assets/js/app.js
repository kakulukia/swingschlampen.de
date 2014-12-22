
angular.module('page', ['bootstrap.tabset'])
    .controller('storeCtrl', function ($scope, $http) {
        $scope.shirts = [
            {'name': 'shirt-flugzeugschwarz', 'price': '30,- €'},
            {'name': 'shirt-flugzeugblauweiss', 'price': '30,- €'},
            {'name': 'shirt-hubschrauber', 'price': '30,- €'},
            {'name': 'shirt-micro', 'price': '30,- €'},
            {'name': 'shirt-logo', 'price': '15,- €'},
        ];
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
                    data: $.param({message: message, subject: 'Bestellung'}),
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

                $http({
                    method: 'POST',
                    url: '/send-mail',
                    data: $.param({
                        from: 'SwingSchlampen.de Kontaktanfrage <' + $scope.fields.email + '>',
                        subject: 'Kontakt',
                        message: $scope.fields.name + ' (' + $scope.fields.email + ') schreibt: \n\n' + $scope.fields.message
                    }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function() {
                    $scope.sent = true;
                    $scope.send_error = false;
                    $scope.submitted = false;

                    //angular.forEach($scope.fields, function(value, key) {
                    //    $scope.fields[key] = '';
                    //});
                }).error(function() {
                    $scope.sent = false;
                    $scope.send_error = true;
                    $scope.submitted = false;
                });
            }
        };
    });
