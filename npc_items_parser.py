# parse file line by line
# if line stars with "item_
# if next iteration contains ID
# create dictionary record with "item_ : ID
# continue iterate , if line starts with "item_ create dictionary record  and continue
d = dict()
spam = "// unique ID number for this item.  Do not change this once established or it will invalidate collected stats."
with open("npc_items_custom.txt", "r") as f:

    for line in f.readlines():
        if not ".kv" in line:
            if line.startswith('"item_'):
                item_name = line.replace('"', "").replace("\n", "").replace("item_", "")
                continue
            if "ID" in line:
                item_id = (
                    line.strip(None)
                    .replace("\t", "")
                    .replace('"ID"', "")
                    .replace('"', "")
                    .replace(spam, "")
                )
                d[item_id] = item_name


print(d)
