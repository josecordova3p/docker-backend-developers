using System;
using Microsoft.AspNetCore.Mvc;

namespace GreetingApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GreetingController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Hello from Docker - .NET";
        }
    }
}