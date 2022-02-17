const StreamrClient = require("streamr-client");
const fs = require("fs");

require("dotenv").config();

const client = new StreamrClient({
  auth: {
    privateKey: process.env.ETHEREUM_PrivateKey,
  },
});

var currentCPUInfo = { total: 0, active: 0 };
var lastCPUInfo = { total: 0, active: 0 };

const calculateCPUPercentage = (oldVals, newVals) => {
  var totalDiff = newVals.total - oldVals.total;
  var activeDiff = newVals.active - oldVals.active;
  return Math.ceil((activeDiff / totalDiff) * 100);
};

const getCPUInfo = () => {
  lastCPUInfo.active = currentCPUInfo.active;
  lastCPUInfo.idle = currentCPUInfo.idle;
  lastCPUInfo.total = currentCPUInfo.total;

  fs.readFile("/proc/stat", "utf8", function (err, data) {
    var lines = data.split("\n");
    var cpuTimes = lines[0].match(/[0-9]+/gi);
    currentCPUInfo.total = 0;
    // We'll count both idle and iowait as idle time
    currentCPUInfo.idle = parseInt(cpuTimes[3]) + parseInt(cpuTimes[4]);
    for (var i = 0; i < cpuTimes.length; i++) {
      currentCPUInfo.total += parseInt(cpuTimes[i]);
    }
    currentCPUInfo.active = currentCPUInfo.total - currentCPUInfo.idle;
    currentCPUInfo.percentUsed = calculateCPUPercentage(
      lastCPUInfo,
      currentCPUInfo
    );

    console.log("Current CPU Usage: " + currentCPUInfo.percentUsed + "%");

    client.publish("STREAM-ID", {
      cpuUsage: "Current CPU Usage: " + currentCPUInfo.percentUsed + "%",
    });
  });
};

setInterval(getCPUInfo, 1000);
