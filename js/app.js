
angular.module('page', ['bootstrap.tabset'])
    .controller('storeCtrl', function ($scope, $http) {

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
    })
    .controller('TabsCtrl', ['$scope', function ($scope) {
        $scope.tabs = [
            {title: 'Home', page: 'home.html'},
            {title: 'News', page: 'news.html'},
            {title: 'Band', page: 'band.html'},

            {title: 'Termine', page: 'termine.html'},
            {title: 'Shop', page: 'shop.html'},
            {title: 'Kontakt', page: 'kotakt.html'},
            {title: 'Presse', page: 'presse.html'},

        ];

//        <li class="flyout">
//            Media
//            <ul>
//            <li><a href="fotos.html">Fotos</a></li>
//            <li>Videos</li>
//        </ul>
//        </li>
//        <li><a href="termine.html">Termine</a></li>
//        <li><a href="shop.html">Shop</a></li>
//        <li><a href="kontakt.html">Kontakt</a></li>
//        <li><a href="presse.html">Presse</a></li>

        $scope.currentTab = $scope.tabs[0];

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab;
            console.log($scope.currentTab);
        }

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    }]);
