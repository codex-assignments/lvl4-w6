import os
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
from supabase import create_client, Client
load_dotenv()
app=Flask(__name__)
CORS(app)

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

@app.get("/")
def health():
    return {"status": "ok"}


@app.get("/api/gear")
def get_resources():
    res = supabase.table("gear").select("*").order("created_at", desc=True).execute().data
    return res, 200

@app.post("/api/gear")
def create_gear():
    data = request.get_json() or {}
    if not data.get("item_name"):
        return {"error": "item_name is required"}, 400
    # build dictionary/payload to be posted to supabase
    newGear = {
        "item_name": data.get("item_name"),
        "category": data.get("category", "General"),
        "quantity": data.get("quantity", 1),
        "is_packed": False,
        "notes": data.get("notes", "")
    }
    response = supabase.table("gear").insert(newGear).execute()
    # return just the newly added line
    return response.data[0], 201

# update gear
@app.put("/api/gear/<int:gear_id>")
def update_gear(gear_id):
    data = request.get_json() or {}
    updatedGear = {}
    if "item_name" in data: 
        updatedGear["item_name"] = data ["item_name"]
    if "category" in data: 
        updatedGear["category"] = data ["category"]
    if "quantity" in data: 
        # set data type to int
        updatedGear["quantity"] = int(data ["quantity"])
    if "is_packed" in data: 
        # need to use boolean
        updatedGear["is_packed"] = bool(data ["is_packed"])
    if "notes" in data: 
        updatedGear["notes"] = data ["notes"]

    res = (
        supabase.table("gear").update(updatedGear).eq("id", gear_id).execute()
    )

    if not res.data:
        return{"error": "Item not found."}, 404

    return res.data[0], 200

@app.delete("/api/gear/<int:gear_id>")
def delete_gear(gear_id):
    supabase.table("gear").delete().eq("id", gear_id).execute()
    return {"message": "Item has been deleted."}, 200
    

if __name__ == "__main__":
    app.run(debug=True)