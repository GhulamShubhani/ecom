#!/usr/bin/env python3
"""Prepare Shopify product + collection CSVs from a product export."""

from __future__ import annotations

import csv
import random
import re
from collections import defaultdict
from pathlib import Path

INPUT_CSV = Path(r"c:\Users\ghula\Downloads\products_export_1.csv")
OUTPUT_PRODUCTS = Path(r"c:\Users\ghula\Downloads\products_export_updated.csv")
OUTPUT_COLLECTIONS = Path(r"c:\Users\ghula\Downloads\collections_import_REFERENCE_ONLY.csv")
OUTPUT_SETUP_GUIDE = Path(r"c:\Users\ghula\Downloads\COLLECTIONS_SETUP_GUIDE.txt")
OUTPUT_README = Path(r"c:\Users\ghula\Downloads\SHOPIFY_IMPORT_README.txt")

COMPLEMENTARY_COL = (
    "Complementary products "
    "(product.metafields.shopify--discovery--product_recommendation.complementary_products)"
)
RELATED_COL = (
    "Related products "
    "(product.metafields.shopify--discovery--product_recommendation.related_products)"
)
RELATED_SETTINGS_COL = (
    "Related products settings "
    "(product.metafields.shopify--discovery--product_recommendation.related_products_display)"
)

COLLECTIONS = [
    {
        "handle": "for-her",
        "title": "For Her",
        "body": "<p>Women's clothing, shoes, accessories and jewelry — curated seasonal edits.</p>",
        "sort": "best-selling",
        "tag": "collection:for-her",
    },
    {
        "handle": "for-him",
        "title": "For Him",
        "body": "<p>Men's tailoring, denim, knitwear and everyday essentials.</p>",
        "sort": "best-selling",
        "tag": "collection:for-him",
    },
    {
        "handle": "dresses",
        "title": "Dresses",
        "body": "<p>Occasion dresses, day dresses and evening silhouettes.</p>",
        "sort": "best-selling",
        "tag": "collection:dresses",
    },
    {
        "handle": "new-arrivals",
        "title": "New Arrivals",
        "body": "<p>Just landed — the latest pieces from our seasonal edit.</p>",
        "sort": "created-desc",
        "tag": "collection:new-arrivals",
    },
    {
        "handle": "clothing",
        "title": "Clothing",
        "body": "<p>Apparel for every layer — tops, bottoms, outerwear and more.</p>",
        "sort": "best-selling",
        "tag": "collection:clothing",
    },
    {
        "handle": "accessories",
        "title": "Accessories",
        "body": "<p>Scarves, bags, hats, socks and finishing touches.</p>",
        "sort": "best-selling",
        "tag": "collection:accessories",
    },
    {
        "handle": "jewelry",
        "title": "Jewelry",
        "body": "<p>Rings, necklaces, bracelets and earrings.</p>",
        "sort": "best-selling",
        "tag": "collection:jewelry",
    },
    {
        "handle": "shoes",
        "title": "Shoes",
        "body": "<p>Footwear for every occasion — sneakers, sandals, boots and more.</p>",
        "sort": "best-selling",
        "tag": "collection:shoes",
    },
    {
        "handle": "denim",
        "title": "Denim",
        "body": "<p>Jeans and denim essentials for her and him.</p>",
        "sort": "best-selling",
        "tag": "collection:denim",
    },
    {
        "handle": "bestsellers",
        "title": "Bestsellers",
        "body": "<p>Our most-loved pieces — customer favourites across every category.</p>",
        "sort": "best-selling",
        "tag": "collection:bestsellers",
    },
    {
        "handle": "sale",
        "title": "Sale",
        "body": "<p>Reduced styles while stocks last.</p>",
        "sort": "best-selling",
        "tag": "collection:sale",
    },
]

NOISE_TAGS = {
    "copy",
    "unlinked",
    "shot 7/9/15",
    "shot 7/2/15",
    "shot 6/11/15",
    "shot 6/4/15",
    "shot 5/8/15",
    "shot 5/14",
    "shot 4/19",
    "signature",
    "visible",
    "feather",
    "bounty",
    "cooloff",
    "shoemoon",
    "spring8",
    "spring9",
    "salefave3",
    "stripesmen",
    "fathersday",
}


def norm_type(value: str) -> str:
    return (value or "").strip().lower()


def parse_tags(raw: str) -> list[str]:
    return [part.strip() for part in (raw or "").split(",") if part.strip()]


def get_gender(tags: list[str]) -> str:
    lowered = {tag.lower() for tag in tags}
    if "woman" in lowered or "womens" in lowered:
        return "women"
    if "man" in lowered or "mens" in lowered:
        return "men"
    return "unisex"


def get_department(type_value: str, tags: list[str]) -> str:
    type_l = norm_type(type_value)
    tags_l = {tag.lower() for tag in tags}

    if any(word in type_l for word in ("bracelet", "necklace", "ring", "earring", "jewelry")):
        return "jewelry"
    if "jewelry" in tags_l:
        return "jewelry"

    if any(
        word in type_l
        for word in (
            "scarf",
            "hat",
            "bag",
            "sock",
            "belt",
            "glove",
            "sunglass",
            "accessories",
            "brief",
        )
    ):
        return "accessories"
    if "accessories" in tags_l:
        return "accessories"

    if any(word in type_l for word in ("shoe", "sneaker", "sandal", "boot", "oxford", "brogue")):
        return "shoes"

    if (
        "denim" in type_l
        or "jean" in type_l
        or "denim" in tags_l
        or "jeans" in tags_l
        or "boyfriend" in tags_l
    ):
        return "denim"

    return "clothing"


def get_subcategory(type_value: str) -> str:
    type_l = norm_type(type_value)
    mapping = [
        ("dress", "dresses"),
        ("jumpsuit", "jumpsuits"),
        ("skirt", "skirts"),
        ("short", "shorts"),
        ("pant", "pants"),
        ("trouser", "trousers"),
        ("jean", "denim"),
        ("denim", "denim"),
        ("coat", "outerwear"),
        ("jacket", "outerwear"),
        ("blazer", "outerwear"),
        ("anorak", "outerwear"),
        ("knit", "knitwear"),
        ("lingerie", "lingerie"),
        ("undergarment", "lingerie"),
        ("brief", "underwear"),
        ("shoe", "shoes"),
        ("sneaker", "shoes"),
        ("sandal", "shoes"),
        ("scarf", "scarves"),
        ("hat", "hats"),
        ("bag", "bags"),
        ("sock", "socks"),
        ("bracelet", "bracelets"),
        ("necklace", "necklaces"),
        ("ring", "rings"),
        ("top", "tops"),
        ("shirt", "shirts"),
        ("tee", "tees"),
        ("t-shirt", "tees"),
        ("tunic", "tops"),
        ("robe", "tops"),
    ]
    for needle, label in mapping:
        if needle in type_l:
            return label
    return "other"


def parse_price(value: str) -> float:
    try:
        return float(value or 0)
    except ValueError:
        return 0.0


def clean_tags(existing: list[str], meta: dict) -> list[str]:
    kept: list[str] = []
    seen: set[str] = set()

    for tag in existing:
        key = tag.lower()
        if key in NOISE_TAGS:
            continue
        if key in seen:
            continue
        seen.add(key)
        kept.append(tag)

    additions = [
        f"audience:{meta['gender']}",
        f"department:{meta['department']}",
        f"subcategory:{meta['subcategory']}",
    ]

    for collection_tag in meta["collection_tags"]:
        additions.append(collection_tag)

    for tag in additions:
        if tag not in seen:
            seen.add(tag)
            kept.append(tag)

    return kept


def build_index(products: list[dict]) -> dict[str, dict]:
    index: dict[str, dict] = {}
    for product in products:
        index[product["handle"]] = product
    return index


def pick_related(product: dict, pool: list[dict], count: int = 6) -> list[str]:
    candidates: list[tuple[float, str]] = []
    price = product["price"]

    for other in pool:
        if other["handle"] == product["handle"]:
            continue
        if product["gender"] != "unisex" and other["gender"] not in (product["gender"], "unisex"):
            continue

        score = 0.0
        if other["subcategory"] == product["subcategory"]:
            score += 5
        elif other["department"] == product["department"]:
            score += 3

        if product["vendor"] and other["vendor"] == product["vendor"]:
            score += 1

        price_delta = abs(other["price"] - price)
        score += max(0, 3 - (price_delta / max(price, 1) * 3))

        candidates.append((score, other["handle"]))

    candidates.sort(key=lambda item: item[0], reverse=True)
    handles: list[str] = []
    for _, handle in candidates:
        if handle in handles:
            continue
        handles.append(handle)
        if len(handles) >= count:
            break
    return handles


def pick_from_pool(
    pool: list[dict],
    *,
    gender: str,
    department: str | None = None,
    subcategory: str | None = None,
    exclude: set[str],
    count: int,
) -> list[str]:
    matches: list[tuple[float, str]] = []
    for item in pool:
        if item["handle"] in exclude:
            continue
        if gender != "unisex" and item["gender"] not in (gender, "unisex"):
            continue
        if department and item["department"] != department:
            continue
        if subcategory and item["subcategory"] != subcategory:
            continue
        matches.append((item["price"], item["handle"]))

    matches.sort(key=lambda entry: entry[0])
    return [handle for _, handle in matches[:count]]


def pick_complementary(product: dict, pool: list[dict]) -> list[str]:
    exclude = {product["handle"]}
    gender = product["gender"]
    sub = product["subcategory"]
    dept = product["department"]
    picks: list[str] = []

    def extend(handles: list[str]) -> None:
        for handle in handles:
            if handle not in exclude and handle not in picks:
                picks.append(handle)
                exclude.add(handle)

    if sub == "dresses":
        extend(pick_from_pool(pool, gender=gender, department="shoes", exclude=exclude, count=1))
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                department="accessories",
                exclude=exclude,
                count=1,
            )
        )
        extend(pick_from_pool(pool, gender=gender, department="jewelry", exclude=exclude, count=1))
    elif sub in {"tops", "shirts", "tees", "knitwear"}:
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="pants",
                exclude=exclude,
                count=1,
            )
        )
        if len(picks) < 2:
            extend(
                pick_from_pool(
                    pool,
                    gender=gender,
                    subcategory="skirts",
                    exclude=exclude,
                    count=1,
                )
            )
        extend(pick_from_pool(pool, gender=gender, department="shoes", exclude=exclude, count=1))
    elif sub in {"pants", "trousers", "shorts", "skirts", "denim"}:
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="tops",
                exclude=exclude,
                count=1,
            )
        )
        extend(pick_from_pool(pool, gender=gender, department="shoes", exclude=exclude, count=1))
    elif sub == "outerwear":
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="tops",
                exclude=exclude,
                count=1,
            )
        )
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="pants",
                exclude=exclude,
                count=1,
            )
        )
    elif dept == "shoes":
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="dresses",
                exclude=exclude,
                count=1,
            )
        )
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                department="accessories",
                exclude=exclude,
                count=1,
            )
        )
    elif dept == "jewelry":
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="dresses",
                exclude=exclude,
                count=1,
            )
        )
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="tops",
                exclude=exclude,
                count=1,
            )
        )
    elif dept == "accessories":
        extend(
            pick_from_pool(
                pool,
                gender=gender,
                subcategory="dresses",
                exclude=exclude,
                count=1,
            )
        )
        extend(pick_from_pool(pool, gender=gender, department="shoes", exclude=exclude, count=1))
    else:
        extend(pick_related(product, pool, count=3))

    return picks[:4]


def main() -> None:
    random.seed(42)

    with INPUT_CSV.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    product_rows = [row for row in rows if row.get("Handle") and row.get("Title")]
    products: list[dict] = []

    for row in product_rows:
        tags = parse_tags(row.get("Tags", ""))
        gender = get_gender(tags)
        department = get_department(row.get("Type", ""), tags)
        subcategory = get_subcategory(row.get("Type", ""))
        tags_l = {tag.lower() for tag in tags}

        collection_tags = []
        if gender == "women":
            collection_tags.append("collection:for-her")
        elif gender == "men":
            collection_tags.append("collection:for-him")

        if subcategory == "dresses":
            collection_tags.append("collection:dresses")

        if department in {"clothing", "denim"}:
            collection_tags.append("collection:clothing")
        elif department == "accessories":
            collection_tags.append("collection:accessories")
        elif department == "jewelry":
            collection_tags.append("collection:jewelry")
        elif department == "shoes":
            collection_tags.append("collection:shoes")

        if department == "denim" or subcategory == "denim" or "denim" in tags_l or "jeans" in tags_l:
            collection_tags.append("collection:denim")

        if "arrivals" in tags_l:
            collection_tags.append("collection:new-arrivals")

        if "sale" in tags_l:
            collection_tags.append("collection:sale")

        products.append(
            {
                "row": row,
                "handle": row["Handle"].strip(),
                "title": row.get("Title", "").strip(),
                "vendor": (row.get("Vendor") or "").strip(),
                "type": row.get("Type", "").strip(),
                "tags": tags,
                "gender": gender,
                "department": department,
                "subcategory": subcategory,
                "price": parse_price(row.get("Variant Price", "")),
                "collection_tags": sorted(set(collection_tags)),
            }
        )

    # Mark ~20% as bestsellers — weighted toward non-sale arrivals
    bestseller_candidates = [
        product
        for product in products
        if "collection:new-arrivals" in product["collection_tags"]
        or product["price"] >= 250
    ]
    random.shuffle(bestseller_candidates)
    bestseller_count = max(120, len(products) // 5)
    bestseller_handles = {
        product["handle"] for product in bestseller_candidates[:bestseller_count]
    }

    for product in products:
        if product["handle"] in bestseller_handles:
            if "collection:bestsellers" not in product["collection_tags"]:
                product["collection_tags"].append("collection:bestsellers")

    index = build_index(products)

    for product in products:
        related = pick_related(product, products, count=6)
        complementary = pick_complementary(product, products)

        meta = {
            "gender": product["gender"],
            "department": product["department"],
            "subcategory": product["subcategory"],
            "collection_tags": product["collection_tags"],
        }
        cleaned = clean_tags(product["tags"], meta)
        product["row"]["Tags"] = ", ".join(cleaned)
        product["row"][RELATED_COL] = "; ".join(related)
        product["row"][COMPLEMENTARY_COL] = "; ".join(complementary)
        product["row"][RELATED_SETTINGS_COL] = "ahead"
        product["row"]["Snowboard binding mount (product.metafields.test_data.binding_mount)"] = ""
        product["row"]["Snowboard length (product.metafields.test_data.snowboard_length)"] = ""

    with OUTPUT_PRODUCTS.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for product in products:
            writer.writerow(product["row"])

    collection_fields = [
        "Handle",
        "Title",
        "Body HTML",
        "Published",
        "Published Scope",
        "Sort Order",
        "Template Suffix",
        "Image Src",
        "Image Alt Text",
        "SEO Title",
        "SEO Description",
        "Rule: Product Column",
        "Rule: Relation",
        "Rule: Condition",
    ]

    with OUTPUT_COLLECTIONS.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=collection_fields)
        writer.writeheader()
        for collection in COLLECTIONS:
            writer.writerow(
                {
                    "Handle": collection["handle"],
                    "Title": collection["title"],
                    "Body HTML": collection["body"],
                    "Published": "TRUE",
                    "Published Scope": "global",
                    "Sort Order": collection["sort"],
                    "Rule: Product Column": "Tag",
                    "Rule: Relation": "Equals",
                    "Rule: Condition": collection["tag"],
                }
            )

    stats = defaultdict(int)
    for product in products:
        for tag in product["collection_tags"]:
            stats[tag] += 1

    readme = f"""Shopify catalog import — CORRECTED GUIDE
========================================

Generated from: {INPUT_CSV.name}

FILES
-----
1. products_export_updated.csv              — import via Products > Import
2. COLLECTIONS_SETUP_GUIDE.txt              — create collections in Admin (required)
3. collections_import_REFERENCE_ONLY.csv    — DO NOT import (reference rules only)

WHY collections CSV FAILS IN PRODUCT IMPORT
-------------------------------------------
collections_import has no Option1 name/value columns.
Uploading it in Products > Import causes:
  "Product options input is required when updating variants"

Shopify also does NOT support bulk CSV import for smart collections.
Create collections manually using COLLECTIONS_SETUP_GUIDE.txt.

PRODUCT CSV FORMAT
------------------
products_export_updated.csv uses your store EXPORT format (Handle, Option1 Name…)
product_template.csv uses Shopify NEW format (URL handle, Option1 name…)
Your updated file matches the export that already worked for you.

COLLECTION MEMBERSHIP (tags already on products)
------------------------------------------------
{chr(10).join(f"  {tag}: {count} products" for tag, count in sorted(stats.items()))}

Products with complementary recommendations: {sum(1 for p in products if p['row'][COMPLEMENTARY_COL])}
Products with related recommendations: {sum(1 for p in products if p['row'][RELATED_COL])}
"""

    OUTPUT_README.write_text(readme, encoding="utf-8")

    setup_guide = """HOW TO CREATE COLLECTIONS (after products import)
=================================================

WHY collections_import.csv FAILED
-----------------------------------
1. Uploaded in Products > Import — that screen requires Option1 name + Option1 value.
2. Shopify does NOT support bulk CSV import for smart collections.

CREATE EACH COLLECTION (11 total)
---------------------------------
Admin > Products > Collections > Create collection
Type: Smart | Match: all conditions | Tag is equal to:

"""
    for collection in COLLECTIONS:
        setup_guide += f"  {collection['handle']:16} → {collection['tag']}\n"

    setup_guide += """
Set each collection Handle in SEO settings to match the handle above.
Sort: Best selling (use Newest for new-arrivals only).
"""
    OUTPUT_SETUP_GUIDE.write_text(setup_guide, encoding="utf-8")

    print(readme)
    print(f"\nWrote {OUTPUT_PRODUCTS}")
    print(f"Wrote {OUTPUT_COLLECTIONS}")
    print(f"Wrote {OUTPUT_README}")


if __name__ == "__main__":
    main()
