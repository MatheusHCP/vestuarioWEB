using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vestuarioWEB.Controllers
{
    public class listaController : Controller
    {
        public IActionResult listaCategorias()
        {
            return View();
        }
        public IActionResult listaMarcas()
        {
            return View();
        }
    }
}
