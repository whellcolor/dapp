# Example: Get latest block number on Ethereum
import requests
import json

response = requests.post(
    "https://1.rpc.thirdweb.com/e6230839e78c90a670b64b1f26c0b3d8",
    headers={"Content-Type": "application/json"},
    json={
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": 1
    }
)
data = response.json()
print("Latest block number:", int(data["result"], 16))
