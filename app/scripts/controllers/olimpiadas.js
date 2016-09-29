'use strict';

/**
 * @ngdoc function
 * @name losolimpicosApp.controller:OlimpiadasCtrl
 * @description
 * # OlimpiadasCtrl
 * Controller of the losolimpicosApp
 */

var estadisticasLO = angular.module('estadisticasOlimpiadas', [])

.component('estadisticasOlimpiadas', {
    templateUrl: 'views/olimpiadas.html',
    controller: ['$scope', 'juegosRepository', '$timeout', function ($scope, juegosRepository, $timeout) {
        $scope.forms = [{
            text: '',
        }];
        $scope.aniosLoaded = true; //para actualizar el rotador luego del hacer el filtro de años

        $scope.anios = {
            '1896': {numero: '1896', sede: 'Grecia', texto: '', deportestotal: '9'},
            '1900': {numero: '1900', sede: 'Francia', texto: '', deportestotal: '19'},
            '1904': {numero: '1904', sede: 'Estados Unidos', texto: '', deportestotal: '16'},
            // NO VA {numero:'1906', sede:'Grecia', texto:'', deportestotal:''},
            '1908': {numero: '1908', sede: 'Reino Unido', texto: '', deportestotal: '22'},
            '1912': {numero: '1912', sede: 'Suecia', texto: '', deportestotal: '14'},
            '1916': {numero: '1916', sede: 'Alemania', texto: 'No se jugó', deportestotal: ''},
            '1920': {numero: '1920', sede: 'Bélgica', texto: '', deportestotal: '22'},
            '1924': {numero: '1924', sede: 'Francia', texto: '', deportestotal: '17'},
            '1928': {numero: '1928', sede: 'Países Bajos', texto: '', deportestotal: '14'},
            '1932': {numero: '1932', sede: 'Estados Unidos', texto: '', deportestotal: '14'},
            '1936': {numero: '1936', sede: 'Alemania', texto: '', deportestotal: '19'},
            '1940': {numero: '1940', sede: 'Finlandia', texto: 'No se jugó', deportestotal: ''},
            '1944': {numero: '1944', sede: 'Reino Unido', texto: 'No se jugó', deportestotal: ''},
            '1948': {numero: '1948', sede: 'Reino Unido', texto: '', deportestotal: '17'},
            '1952': {numero: '1952', sede: 'Finlandia', texto: '', deportestotal: '17'},
            '1956': {numero: '1956', sede: 'Australia', texto: '', deportestotal: '17'},
            '1960': {numero: '1960', sede: 'Italia', texto: '', deportestotal: '17'},
            '1964': {numero: '1964', sede: 'Japón', texto: '', deportestotal: '19'},
            '1968': {numero: '1968', sede: 'México', texto: '', deportestotal: '20'},
            '1972': {numero: '1972', sede: 'Alemania Federal', texto: '', deportestotal: '23'},
            '1976': {numero: '1976', sede: 'Canada', texto: '', deportestotal: '21'},
            '1980': {numero: '1980', sede: 'Unión Soviética', texto: '', deportestotal: '21'},
            '1984': {numero: '1984', sede: 'Estados Unidos', texto: '', deportestotal: '21'},
            '1988': {numero: '1988', sede: 'Corea del Sur', texto: '', deportestotal: '23'},
            '1992': {numero: '1992', sede: 'España', texto: '', deportestotal: '28'},
            '1996': {numero: '1996', sede: 'Estados Unidos', texto: '', deportestotal: '26'},
            '2000': {numero: '2000', sede: 'Australia', texto: '', deportestotal: '28'},
            '2004': {numero: '2004', sede: 'Grecia', texto: '', deportestotal: '28'},
            '2008': {numero: '2008', sede: 'China', texto: '', deportestotal: '28'},
            '2012': {numero: '2012', sede: 'Reino Unido', texto: '', deportestotal: '26'}
        };


        juegosRepository.getAllOlimpidas().success(function (olimpiadas) {
            $scope.olimpiadas = olimpiadas;
            $scope.paises = [];
            $scope.barData = {};
            $scope.barDeportesData = {};
            Object.keys(olimpiadas).forEach(function (pais) {
                $scope.paises.push(pais);
                $scope.barData[pais] = {};
                $scope.barDeportesData[pais] = {};
                Object.keys(olimpiadas[pais].participaciones).forEach(function (anio) {
                    $scope.barData[pais][anio] = {
                        labels: ['H', 'M'],
                        series: [
                            [
                                {meta: 'Hombres', value: parseInt(olimpiadas[pais].participaciones[anio].Hombres)}
                            ],
                            [
                                {meta: 'Mujeres', value: parseInt(olimpiadas[pais].participaciones[anio].Mujeres)}
                            ]
                        ]
                    };
                    $scope.barDeportesData[pais][anio] = {
                        labels: ['', ''],
                        series: [
                            [
                                {meta: 'Deportes:', value: parseInt($scope.anios[anio].deportestotal)}
                            ],
                            [
                                {meta: 'Participó en:', value: parseInt(olimpiadas[pais].participaciones[anio]['Cantidad' +
                                ' deportes'])}
                            ]
                        ]
                    };

                    /* bar chart
                     this.barData = {
                     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                     series: [
                     [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                     [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                     ]
                     };*/
                });
            });

            $scope.barOptions = {
                width: '90px',
                height: '140px',
                seriesBarDistance: 25,
                plugins: [
                    Chartist.plugins.tooltip({
                        class: 'ventana-emergente',
                        appendToBody: true
                    })
                ]
            };
            $scope.barDeportesOptions = {
                width: '90px',
                height: '140px',
                seriesBarDistance: 0,
                plugins: [
                    Chartist.plugins.tooltip({
                        class: 'ventana-emergente',
                        appendToBody: true
                    })
                ]
            };

            $scope.barEvents = {
                draw: function(data) {
                    if(data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 25px'
                        });
                    }
                }
            };
            $scope.barDeportesEvents = {
                draw: function(data) {
                    if(data.type === 'bar') {
                        data.element.attr({
                            style: 'stroke-width: 30px'
                        });
                    }
                }
            };

            $scope.breakpoints = [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ];

            $scope.barResponsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            $scope.paises.sort();
            $scope.miPais = '';

        });

        $scope.addForm = function () {
            $scope.forms.push({
                text: ''
            });
        };


        $scope.addOlimpiada = function () {
            $scope.olimpiadas.push($scope.olimpiada);
            $scope.olimpiada = '';
        };

        $scope.removeOlimpiada = function (index) {
            $scope.olimpiadas.splice(index, 1);
        };

        $scope.getLength = function (obj) {
            if (obj) {
                return Object.keys(obj).length;
            } else {
                return '';
            }
        };


        $scope.filter = function () {
            $timeout(function () {
                $('.slick-slider').hide();
                $scope.aniosLoaded = false;
            }, 10);
            $timeout(function () {
                $scope.aniosLoaded = true;
                $('.slick-slider').show();
            }, 11);
        };


    }]
});



estadisticasLO.factory('juegosRepository', function($http) {
    return {
        getAllOlimpidas: function() {

            var url = 'json/data.json';
            return $http.get(url);

        }
    };
});

estadisticasLO.filter('fechaFormato', function($filter) {
    return function(input)
    {
        if(input === null){ return; }

        var _date = $filter('date')(new Date(input), 'dd.MM.yyyy');

        return _date;

    };
});

estadisticasLO.filter('emptyFilter', function() {
    return function(array) {
        var filteredArray = [];
        angular.forEach(array, function(item) {
            if (item.titulo) {

                filteredArray.push(item);
            }
        });
        return filteredArray;
    };
});
estadisticasLO.filter('filtroPorAnio', function() {
    return function(array, desde, hasta) {
        var filteredArray = [];
        if (desde && hasta) {
            angular.forEach(array, function(item) {
                if (item.numero >= desde.numero && item.numero <= hasta.numero) {
                    filteredArray.push(item);
                }
            });
        } else if (desde) {
            angular.forEach(array, function(item) {
                if (item.numero >= desde.numero) {
                    filteredArray.push(item);
                }
            });
        } else if (hasta) {
            angular.forEach(array, function(item) {
                if (item.numero <= hasta.numero) {
                    filteredArray.push(item);
                }
            });
        } else {
            filteredArray = array;
        }
        return filteredArray;
    };
});


estadisticasLO.directive('onFinishRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    };
});
