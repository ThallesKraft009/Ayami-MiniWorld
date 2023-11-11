import { ClusterManager } from 'discord-hybrid-sharding'

import c from "colors";

import dotenv from "dotenv";
dotenv.config();

const manager = new ClusterManager(`index.js`, {
    totalShards: 5,
    shardsPerClusters: 5,
    totalClusters: 1,
    mode: 'process',
    token: process.env.token,
});

manager.on('clusterCreate', cluster => console.log(c.blue(`Launched Cluster ${cluster.id}`)));
manager.spawn({ timeout: -1 });