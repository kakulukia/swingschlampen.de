
angular.module('page', [])
    .controller('storeCtrl', function ($scope) {

        $scope.shirts = ['shirt1', 'shirt2', 'shirt3', 'shirt4', 'shirt5'];
        $scope.fields = {}; // initialize form fields

        // Form submit handler.
        $scope.submit = function(form) {
            // Trigger validation flag.
            $scope.submitted = true;

            // If form is invalid, return and let AngularJS show validation errors.
            console.log($scope.fields);
            if (form.$invalid) {
                console.log('invalid');
                return;
            }
            else {
                console.log($scope.fields);

                $http.post('http://127.0.0.1:300/send-mail', $scope.fields ).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }


            //


        };
    });
