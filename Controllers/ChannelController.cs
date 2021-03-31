using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PayApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChannelController : ControllerBase
    {

        private readonly ILogger<ChannelController> _logger;

        public ChannelController(ILogger<ChannelController> logger)
        {
            _logger = logger;
        }
        //default method for controller get if no route specified
        [HttpGet]
        public IEnumerable<object> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 1000).Select(index => new
            {
                itemName = "testname" + index,
                itemDesc = "testdesc" + index,
                itemExtra = "testextra" + index,
                itemPrice = index * rng.Next()
            })
            .ToArray();
        }
    }
}
