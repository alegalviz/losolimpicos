<?php
/*
* Scrapper para las olimpiadas
* Creado por Alek - 2016
*
*
*
*
*/
require __DIR__ . '/vendor/autoload.php';

use Goutte\Client;

$client = new Client();

// Go to the symfony.com website
$crawler = $client->request('GET', 'http://www.sports-reference.com/olympics/countries/');

$scrap = array();

$paises = $crawler->filter('#countries a')->each(function ($node) use ($crawler, $client, $scrap) {

    // Para cada país ingreso en sus datos haciendo click
    $link = $crawler->selectLink($node->text())->link();
    $crawler = $client->click($link);
    $pais = '';

    // Obtengo el nombre del país
    $crawler->filter('#info_box h1')->each(function ($node) use (&$pais){
        $pais = $node->text();
    });

    // Oencabezados de la tabla de datos
    $encabezados = $crawler->filter('th')->each(function ($node, $i) {
        return $node->text();
    });

    /* Obtengo abreviación del país */
    $abreviacion = substr($link->getUri(), -4, 3); //viene con la barra final
    $scrap[$pais] = ['abreviacion' => $abreviacion];

    $filas = $crawler->filter('.stats_table tr')->each(function ($node) use (&$scrap, $pais, $encabezados, $crawler, $client){

        $text = $node->text();
        $pos = strpos($text, 'Summer');

        if ($pos !== false) {
            $anio = substr($text, $pos -5, 4);
            $valores = $node->filter('td')->each(function ($nodenode){
                return $nodenode->text();
            });
            $fila = array_combine($encabezados, $valores);
            $scrap[$pais]['participaciones'][$anio] = $fila;


            // Para cada olimpiada que dice summer
            $linkdeportes = $crawler->selectLink($node->filter('a')->first()->text())->link();
            $crawler = $client->click($linkdeportes);

            $deportes = [];
            $deportes = $crawler->filter('#sports a')->each(function ($node) {
                return $node->text();
            });

            $scrap[$pais]['participaciones'][$anio]['deportes'] = $deportes;
        }
    });
    $scrap = \GuzzleHttp\json_encode($scrap, JSON_FORCE_OBJECT);
    //print '<pre>';
    //var_dump($scrap);
    // print '</pre>';

    //print '<pre>';
    //var_dump($scrap);
    //print '</pre>';
    //exit();


    print $scrap;
});













