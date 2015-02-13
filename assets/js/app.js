
angular.module('page', ['ui.sortable', 'bootstrap.tabset', 'ngLodash'])
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
                    data: {message: message, subject: 'Bestellung'},
                    headers: {'Content-Type': 'application/json'}
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
                    data: {
                        from: 'SwingSchlampen.de Kontaktanfrage <' + $scope.fields.email + '>',
                        subject: 'Kontakt',
                        message: $scope.fields.name + ' (' + $scope.fields.email + ') schreibt: \n\n' + $scope.fields.message
                    },
                    headers: {'Content-Type': 'application/json'}
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
    })
    .controller('eventCtrl', function($scope, $http, lodash){
        $scope.termine = [];
        $scope.editable = false;

        $http.get('termine.json')
            .then(function(res){
                $scope.termine = res.data;
            });

        $scope.more = function(){
            $scope.termine.push({
                "month": "neuer Monat",
                "events": [{
                    "date": "neuer Termin",
                    "name": "watt issn da los?"
                }]
            });
            $scope.save();
        };

        $scope.remove = function(entry){
            lodash.remove($scope.termine, entry);
            $scope.save();
        };

        $scope.delete_event = function(event_list, event){
            lodash.remove(event_list, event);
            $scope.save();
        };

        $scope.add_event = function(events){
            events.push({
                "date": "neuer Termin",
                "name": "watt issn da los?"
            });
            $scope.save();
        };

        $scope.save = function(){
            if ($scope.editable) {
                $http({
                    url: '/save_events',
                    method: "POST",
                    data: {termine: $scope.termine, password: $scope.password},
                    headers: {'Content-Type': 'application/json'}
                });

            }
        };

        $scope.dragControlListeners = {
            itemMoved: function (event) {
                $scope.save();
            },
            orderChanged: function(event) {
                $scope.save();
            }
        };

        $scope.edit_me = function(){

            if ($scope.editable) return

            $http({
                url: '/check_password',
                method: "POST",
                data: {password: $scope.password},
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, config) {
                if (data == 'ok'){
                    $scope.editable = true;
                }
            });
        };

    });
