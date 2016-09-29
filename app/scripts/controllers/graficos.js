'use strict';

/**
 * @ngdoc function
 * @name losolimpicosApp.controller:graficosOlimpiadas
 * @description
 * # graficosOlimpiadas
 * Controller of the graficosOlimpiadas
 */

var graficosLO = angular.module('graficosOlimpiadas', [])

    .component('graficosOlimpiadas', {
        templateUrl: 'views/graficos.html',
        controller: ['$scope', 'juegosRepository', '$timeout', function ($scope, juegosRepository) {


            $scope.anios = [
                {numero: '1896', sede: 'Grecia', texto: '', deportestotal: '9'},
                {numero: '1900', sede: 'Francia', texto: '', deportestotal: '19'},
                {numero: '1904', sede: 'Estados Unidos', texto: '', deportestotal: '16'},
                // NO VA {numero:'1906', sede:'Grecia', texto:'', deportestotal:''},
                {numero: '1908', sede: 'Reino Unido', texto: '', deportestotal: '22'},
                {numero: '1912', sede: 'Suecia', texto: '', deportestotal: '14'},
                {numero: '1916', sede: 'Alemania', texto: 'No se jugó', deportestotal: ''},
                {numero: '1920', sede: 'Bélgica', texto: '', deportestotal: '22'},
                {numero: '1924', sede: 'Francia', texto: '', deportestotal: '17'},
                {numero: '1928', sede: 'Países Bajos', texto: '', deportestotal: '14'},
                {numero: '1932', sede: 'Estados Unidos', texto: '', deportestotal: '14'},
                {numero: '1936', sede: 'Alemania', texto: '', deportestotal: '19'},
                {numero: '1940', sede: 'Finlandia', texto: 'No se jugó', deportestotal: ''},
                {numero: '1944', sede: 'Reino Unido', texto: 'No se jugó', deportestotal: ''},
                {numero: '1948', sede: 'Reino Unido', texto: '', deportestotal: '17'},
                {numero: '1952', sede: 'Finlandia', texto: '', deportestotal: '17'},
                {numero: '1956', sede: 'Australia', texto: '', deportestotal: '17'},
                {numero: '1960', sede: 'Italia', texto: '', deportestotal: '17'},
                {numero: '1964', sede: 'Japón', texto: '', deportestotal: '19'},
                {numero: '1968', sede: 'México', texto: '', deportestotal: '20'},
                {numero: '1972', sede: 'Alemania Federal', texto: '', deportestotal: '23'},
                {numero: '1976', sede: 'Canada', texto: '', deportestotal: '21'},
                {numero: '1980', sede: 'Unión Soviética', texto: '', deportestotal: '21'},
                {numero: '1984', sede: 'Estados Unidos', texto: '', deportestotal: '21'},
                {numero: '1988', sede: 'Corea del Sur', texto: '', deportestotal: '23'},
                {numero: '1992', sede: 'España', texto: '', deportestotal: '28'},
                {numero: '1996', sede: 'Estados Unidos', texto: '', deportestotal: '26'},
                {numero: '2000', sede: 'Australia', texto: '', deportestotal: '28'},
                {numero: '2004', sede: 'Grecia', texto: '', deportestotal: '28'},
                {numero: '2008', sede: 'China', texto: '', deportestotal: '28'},
                {numero: '2012', sede: 'Reino Unido', texto: '', deportestotal: '26'}
            ];

            juegosRepository.getAllOlimpidas().success(function (olimpiadas) {
                $scope.olimpiadas = olimpiadas;

                graficarLineasMujeresCH(olimpiadas);
                //graficarHombresMujeres(olimpiadas);
                graficarHombresMujeresChartjs(olimpiadas);
                //graficarParticipantesMedallas(olimpiadas);

            });

            function graficarLineasMujeresCH(olimpiadas){
                var lineMujeresCH = document.getElementById("lineMujeresCH");
                var paisCH = {};

                $scope.lineMujeresData = {};

                var paisesMujeres = [];
                var anios = $.map($scope.anios, function(anio) { return anio.numero; });
                var temporalMujeres = [];

                Object.keys(olimpiadas).forEach(function (pais) {
                    temporalMujeres = [];
                    anios.forEach(function (anio) {

                        if (olimpiadas[pais].participaciones[anio]) {
                            temporalMujeres.push(parseInt(olimpiadas[pais].participaciones[anio].Mujeres));
                        } else {
                            temporalMujeres.push(0);
                        }

                    });
                    /*
                     {
                     label: "Mujeres por país",
                     fill: false,
                     lineTension: 0.1,
                     backgroundColor: "rgba(75,192,192,0.4)",
                     borderColor: "rgba(75,192,192,1)",
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'miter',
                     pointBorderColor: "rgba(75,192,192,1)",
                     pointBackgroundColor: "#fff",
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: "rgba(75,192,192,1)",
                     pointHoverBorderColor: "rgba(220,220,220,1)",
                     pointHoverBorderWidth: 2,
                     pointRadius: 1,
                     pointHitRadius: 10,
                     data: [65, 59, 80, 81, 56, 55, 40],
                     }
                     */

                    var total = 0;
                    $.each(temporalMujeres,function() {
                        total += this;
                    });
                    var color = randomColor({hue: 'orange'});
                    if (total > 50) {
                        paisCH = {
                            label: pais,
                            fill: false,
                            lineTension: 0.3,
                            borderCapStyle: 'butt',
                            borderColor: color,
                            backgroundColor: color,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: temporalMujeres,
                        };

                        paisesMujeres.push(paisCH);
                    }

                });

                var data = {
                    labels: anios,
                    datasets: paisesMujeres
                };

                $scope.chartPaisesMujeresData = {
                    type: 'line',
                    data: data,
                    options: {
                        title: {
                            mode: 'single'
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 16,
                                fontSize: 11
                            }
                        }
                    }
                };


                /*var lineMujeresChart = new Chart(lineMujeresCH, {
                    type: 'line',
                    data: data,
                    options: {
                        title: {
                            mode: 'single'
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });*/

            }

            /*function graficarLineasMujeres(olimpiadas){
                $scope.lineMujeresData = {};

                var paisesMujeres = [];
                var anios = $.map($scope.anios, function(anio) { return anio.numero; });
                var temporalMujeres = [];

                Object.keys(olimpiadas).forEach(function (pais) {
                    temporalMujeres = [];
                    anios.forEach(function (anio) {
                        if (olimpiadas[pais].participaciones[anio]) {
                            temporalMujeres.push({meta: pais, value:parseInt(olimpiadas[pais].participaciones[anio].Mujeres)});
                        } else {
                            temporalMujeres.push({meta: pais, value:0});
                        }

                    });
                    paisesMujeres.push(temporalMujeres);
                });
                $scope.lineMujeresData = {
                    labels: anios,
                    series: paisesMujeres
                };
                /*{ Para lineas https://gionkunz.github.io/chartist-js/index.html
                 labels: ['1996', '2000', '2004', '2008', '2012'],
                 series: [
                 [12, 9, 7, 8, 5], <- pais
                 [2, 1, 3.5, 7, 3],
                 [1, 3, 4, 5, 6]
                 ]
                 }*/
/*
                $scope.lineOptions = {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 2
                    }),
                    plugins: [
                        Chartist.plugins.tooltip()
                    ]
                };
            }*/

            function graficarHombresMujeresChartjs(olimpiadas){
                var lineHombresMujeres = document.getElementById("lineHombresMujeres");
                $scope.lineHombresMujeresData = {};
                var lineaMCH = {};
                var lineaHCH = {};
                var anios = $.map($scope.anios, function (anio) {
                    return anio.numero;
                });
                var totalHombres = 0;
                var totalMujeres = 0;
                var arrHombres = [];
                var arrMujeres = [];
                var paisesHombresMujeres = [];

                anios.forEach(function (anio) {

                    Object.keys(olimpiadas).forEach(function (pais) {

                        if (olimpiadas[pais].participaciones[anio]) {
                            totalHombres += parseInt(olimpiadas[pais].participaciones[anio].Hombres);
                            totalMujeres += parseInt(olimpiadas[pais].participaciones[anio].Mujeres);
                        }

                    });
                    arrHombres.push(totalHombres);
                    arrMujeres.push(totalMujeres);
                    totalHombres = 0;
                    totalMujeres = 0;

                });

                var color = randomColor({hue: 'blue'});
                lineaHCH = {
                    label: 'Hombres',
                    fill: false,
                    lineTension: 0.3,
                    borderCapStyle: 'butt',
                    borderColor: 'rgb(51, 122, 183)',
                    backgroundColor: 'rgb(51, 122, 183)',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: arrHombres,
                };
                lineaMCH = {
                    label: 'Mujeres',
                    fill: false,
                    lineTension: 0.3,
                    borderCapStyle: 'butt',
                    borderColor: 'rgb(234, 127, 38)',
                    backgroundColor: 'rgb(234, 127, 38)',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: arrMujeres,
                };

                paisesHombresMujeres.push(lineaHCH);
                paisesHombresMujeres.push(lineaMCH);

                var data = {
                    labels: anios,
                    datasets: paisesHombresMujeres
                };

                $scope.lineHombresMujeresData = {
                    type: 'line',
                    data: data,
                    options: {
                        title: {
                            mode: 'single'
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 16,
                                fontSize: 11
                            }
                        }
                    }
                };

            }

            function graficarHombresMujeres(olimpiadas) {
                $scope.lineHombresMujeresData = {};

                var anios = $.map($scope.anios, function (anio) {
                    return anio.numero;
                });
                var totalHombres = 0;
                var totalMujeres = 0;
                var arrHombres = [];
                var arrMujeres = [];

                anios.forEach(function (anio) {

                    Object.keys(olimpiadas).forEach(function (pais) {

                        if (olimpiadas[pais].participaciones[anio]) {
                            totalHombres += parseInt(olimpiadas[pais].participaciones[anio].Hombres);
                            totalMujeres += parseInt(olimpiadas[pais].participaciones[anio].Mujeres);
                        }

                    });
                    arrHombres.push(totalHombres);
                    arrMujeres.push(totalMujeres);
                    totalHombres = 0;
                    totalMujeres = 0;

                });
                $scope.lineHombresMujeresData = {
                    labels: anios,
                    series: [
                        arrHombres,
                        arrMujeres
                    ]//,
                    //plugins: [
                    //    Chartist.plugins.tooltip()
                    //]
                };

                $scope.lineOptions = {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 2
                    })//,
                    //plugins: [
                    //    Chartist.plugins.tooltip()
                    //]
                };
            }
            function graficarParticipantesMedallas(olimpiadas) {
                $scope.barsParticipantesMedallasData = {};

                var anios = $.map($scope.anios, function (anio) {
                    return anio.numero;
                });

                var totalParticipantes = 0;
                var totalOro = 0;
                var totalPlata = 0;
                var totalBronce = 0;
                var arrParticipantes = [];
                var arrOro = [];
                var arrPlata = [];
                var arrBronce = [];

                anios.forEach(function (anio) {

                    Object.keys(olimpiadas).forEach(function (pais) {

                        if (olimpiadas[pais].participaciones[anio]) {
                            totalParticipantes += parseInt(olimpiadas[pais].participaciones[anio].Participantes);
                            totalOro += parseInt(olimpiadas[pais].participaciones[anio].Oro);
                            totalPlata += parseInt(olimpiadas[pais].participaciones[anio].Plata);
                            totalBronce += parseInt(olimpiadas[pais].participaciones[anio].Bronce);
                        }

                    });
                    arrParticipantes.push({value:totalParticipantes});
                    arrOro.push({value:totalOro});
                    arrPlata.push({value:totalPlata});
                    arrBronce.push({value:totalBronce});
                    totalParticipantes = 0;
                    totalOro = 0;
                    totalPlata = 0;
                    totalBronce = 0;

                });
                $scope.barsParticipantesMedallasData = {
                    labels: anios,
                    series: [
                        arrParticipantes,
                        arrOro,
                        arrPlata,
                        arrBronce
                    ],
                    stackBars: true //,
                    //plugins: [
                    //    Chartist.plugins.tooltip()
                    //]
                };
                /*{ Para lineas https://gionkunz.github.io/chartist-js/index.html
                 labels: ['1996', '2000', '2004', '2008', '2012'],
                 series: [
                 [12, 9, 7, 8, 5], <- pais
                 [2, 1, 3.5, 7, 3],
                 [1, 3, 4, 5, 6]
                 ]
                 }*/

                $scope.lineOptions = {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 2
                    })
                };
            }

        }]
    });

graficosLO.factory('juegosRepository', function($http) {
        return {
                getAllOlimpidas: function() {

                        var url = 'json/data.json';
                        return $http.get(url);

                }
        };
});
graficosLO.factory('utilitarios', function() {
    this.randomcolor = function(parametro) {

            return randomColor(parametro);

    };
});
graficosLO.directive('chartjsLo', function() {
    return {
        restrict: 'A',
        scope: {
            'model': '='
        },
        link: function(scope, element, attrs) {
            //var $chart = new Chart(angular.element(element), +scope.model);
            scope.$watch('model', function(newVal) {
                new Chart(angular.element(element), newVal);
            });
        }
    };
});
