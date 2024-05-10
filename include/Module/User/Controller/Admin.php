<?php

namespace MerapiPanel\Module\User\Controller;

use MerapiPanel\Box;
use MerapiPanel\Box\Module\__Fragment;
use MerapiPanel\Database\DB;
use MerapiPanel\Utility\Http\Request;
use MerapiPanel\Utility\Util;
use MerapiPanel\Views\View;
use MerapiPanel\Utility\Router;


class Admin extends __Fragment
{


    protected $module;
    function onCreate(\MerapiPanel\Box\Module\Entity\Module $module)
    {
        $this->module = $module;
    }

    public function register()
    {

        if(!$this->module->getRoles()->isAllowed(0)) {
            return;
        }

        $config = $this->module->getConfig();

        Router::GET("/users/add", "addUser", self::class);
        $index = Router::GET("/users", "index", self::class);
        Box::module("Panel")->addMenu([
            "name" => "Users",
            "link" => $index,
            'icon' => 'fa-solid fa-user'
        ]);

        if($config->get("profile")) {
            Box::module("Panel")->addMenu([
                "name" => "Profile",
                "link" => Router::GET("/users/profile", "profile", self::class),
                'icon' => '<i class="fa-regular fa-circle-user"></i>',
                "order" => 1,
                "parent" => "Users"
            ]);
        }
        

        $script = <<<HTML
        <script>
        __.MUser.opts = {
            endpoints: {
                fetch: "{{ '/api/User/fetch' | access_path }}",
                fetchAll: "{{ '/api/User/fetchAll' | access_path }}",
                update: "{{ '/api/User/update' | access_path }}",
                delete: "{{ '/api/User/delete' | access_path }}"
            },
            session: {{ api.Auth.LogedinUser | json_encode | raw }},
            roles: {{ api.User.getRoles | json_encode | raw }}
        }
        </script>
        HTML;
        Box::module("Panel")->Scripts->add("user-opts", $script);
    }


    function addUser(Request $req)
    {
        return View::render("add_user.twig");
    }

    function profile(Request $req) {

        $user = Box::module("Auth")->getLogedinUser();
        $session_data = DB::table("session_geo")->select("*")->where("user_id")->equals($user['id'])->execute()->fetchAll(\PDO::FETCH_ASSOC);
        return View::render("profile.html.twig", ["user" => $user, "session_data" => $session_data]);
    }

    public function index($req)
    {

        return View::render("index.html.twig");
    }
}
