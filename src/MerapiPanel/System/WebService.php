<?php

namespace MerapiPanel\System;

use Il4mb\Routing\Http\Response;
use Il4mb\Routing\Router;
use MerapiPanel\App\Http\Request;
use MerapiPanel\System\Views\View;

abstract class WebService extends WebEnvironment
{

    public function __construct(Router $router)
    {
        $this->basePath = $this->getPath();
        parent::__construct();
    }

    function handle(Request $request, Response $response): bool
    {
        return true;
    }

    function getPath(): string
    {
        $reflector = new \ReflectionClass($this);
        return dirname($reflector->getFileName());
    }

    function dispath(Response $response): Response
    {

        $request = Request::getInstance();
        if ($request->isAjax()) return $response;

        if ($response->getContent() instanceof View)
            $response->setContent($this->render($response->getContent()));
        return $response;
    }
}
