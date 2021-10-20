using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vestuarioWEB.Controllers
{
    public class cadastrosController : Controller
    {
        public IActionResult Categorias()
        {
            return View();
        }

        public IActionResult Marcas()
        {
            return View();
        }
    }
}
