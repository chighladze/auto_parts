import os
import pandas as pd
import sys
import pymysql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Список для хранения ошибочных записей
error_rows = []

try:
    # Загрузка данных из Excel
    print("Reading Excel file...")
    df = pd.read_excel("insert_data.xlsx").fillna("")
    print(f"Found {len(df)} rows in Excel file")

    # Проверка наличия необходимых колонок
    required_columns = [
        "ბრენდი",
        "ჯგუფი",
        "ქვეჯგუფი (ანალოგები)",
        "მანქანის მარკა",
        "ძრავის მოცულობა",
        "დასახელება",
        "არტიკული",
        "შტრიხოდი",
        "ერთეული",
        "სრული დასახელება",
        "შენიშვნა",
        "ზომა",
        "ორიგინალი კოდი",
    ]

    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        print("Error: Missing columns in Excel file:", missing_columns)
        sys.exit(1)

    # Подключение к MariaDB
    print("Connecting to database...")
    conn = pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", "3306")),
        charset="utf8mb4",
    )
    cursor = conn.cursor()

    # Кэш для უკვე ჩაწერილი მნიშვნელობები
    brand_cache = {}
    group_cache = {}
    subgroup_cache = {}
    car_cache = {}

    processed = 0
    total_rows = len(df)

    for index, row in df.iterrows():
        try:
            # 1. Insert or get brand_id
            brand = row["ბრენდი"].strip()
            brand_id = None
            if brand:
                if brand not in brand_cache:
                    cursor.execute("SELECT id FROM brands WHERE name = %s", (brand,))
                    result = cursor.fetchone()
                    if result:
                        brand_id = result[0]
                    else:
                        cursor.execute(
                            "INSERT INTO brands (name) VALUES (%s)", (brand,)
                        )
                        conn.commit()  # Commit შემდეგი ჩაწერის შემდეგ
                        brand_id = cursor.lastrowid
                    brand_cache[brand] = brand_id
                else:
                    brand_id = brand_cache[brand]

            # 2. Insert or get group_id with commit
            group = row["ჯგუფი"].strip()
            group_id = None
            if group:
                if group not in group_cache:
                    cursor.execute(
                        "SELECT id FROM part_groups WHERE name = %s", (group,)
                    )
                    result = cursor.fetchone()
                    if result:
                        group_id = result[0]
                    else:
                        cursor.execute(
                            "INSERT INTO part_groups (name) VALUES (%s)", (group,)
                        )
                        conn.commit()  # Commit შემდეგი ჩაწერის შემდეგ
                        group_id = cursor.lastrowid
                    group_cache[group] = group_id
                else:
                    group_id = group_cache[group]

            # Проверяем არსებობა group_id სანამ დავამატებთ ქვეჯგუფს
            subgroup = row["ქვეჯგუფი (ანალოგები)"].strip()
            if group_id is None and subgroup:
                raise Exception(
                    f"Cannot insert subgroup '{subgroup}' without valid group_id"
                )

            # 3. Insert or get subgroup_id
            subgroup_id = None
            if subgroup:
                key = (subgroup, group_id)
                if key not in subgroup_cache:
                    cursor.execute(
                        "SELECT id FROM part_subgroups "
                        "WHERE name = %s AND group_id = %s",
                        (subgroup, group_id),
                    )
                    result = cursor.fetchone()
                    if result:
                        subgroup_id = result[0]
                    else:
                        cursor.execute(
                            "INSERT INTO part_subgroups (name, group_id) "
                            "VALUES (%s, %s)",
                            (subgroup, group_id),
                        )
                        subgroup_id = cursor.lastrowid
                    subgroup_cache[key] = subgroup_id
                else:
                    subgroup_id = subgroup_cache[key]

            # 4. Insert or get car_id
            car_make = row["მანქანის მარკა"].strip()
            engine_info = row["ძრავის მოცულობა"].strip()
            car_id = None
            if car_make or engine_info:
                key = (car_make, engine_info)
                if key not in car_cache:
                    cursor.execute(
                        "SELECT id FROM cars " "WHERE make = %s AND engine_info = %s",
                        (car_make, engine_info),
                    )
                    result = cursor.fetchone()
                    if result:
                        car_id = result[0]
                    else:
                        cursor.execute(
                            "INSERT INTO cars (make, engine_info) " "VALUES (%s, %s)",
                            (car_make, engine_info),
                        )
                        car_id = cursor.lastrowid
                    car_cache[key] = car_id
                else:
                    car_id = car_cache[key]

            # 5. Insert or update parts
            article_number = row["არტიკული"].strip() or None
            cursor.execute(
                "SELECT id FROM parts WHERE article_number = %s", (article_number,)
            )
            existing_part = cursor.fetchone()

            if existing_part:
                # Update existing part
                cursor.execute(
                    """
                    UPDATE parts SET
                        name = %s, barcode = %s, unit = %s, full_name = %s,
                        note = %s, size = %s, original_code = %s,
                        brand_id = %s, subgroup_id = %s, car_id = %s,
                        is_active = %s
                    WHERE article_number = %s
                """,
                    (
                        row["დასახელება"].strip() or None,
                        row["შტრიხოდი"].strip() or None,
                        row["ერთეული"].strip() or None,
                        row["სრული დასახელება"].strip() or None,
                        row["შენიშვნა"].strip() or None,
                        row["ზომა"].strip() or None,
                        row["ორიგინალი კოდი"].strip() or None,
                        brand_id,
                        subgroup_id,
                        car_id,
                        True,
                        article_number,
                    ),
                )
            else:
                # Insert new part
                cursor.execute(
                    """
                    INSERT INTO parts (
                        name, article_number, barcode, unit,
                        full_name, note, size, original_code,
                        brand_id, subgroup_id, car_id, is_active
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s
                    )
                """,
                    (
                        row["დასახელება"].strip() or None,
                        article_number,
                        row["შტრიხოდი"].strip() or None,
                        row["ერთეული"].strip() or None,
                        row["სრული დასახელება"].strip() or None,
                        row["შენიშვნა"].strip() or None,
                        row["ზომა"].strip() or None,
                        row["ორიგინალი კოდი"].strip() or None,
                        brand_id,
                        subgroup_id,
                        car_id,
                        True,
                    ),
                )

            processed += 1
            if processed % 100 == 0:
                print(f"Processed {processed}/{total_rows} rows")
                conn.commit()  # Периოდული commit

        except Exception as e:
            print(f"Error processing row {index}:", e)
            print("Row data:", row)
            # Добавляем ошибочную запись в список
            error_row = row.copy()
            error_row["error_message"] = str(e)
            error_rows.append(error_row)
            continue

    conn.commit()
    print("✅ Данные успешно импортированы.")
    print(f"Processed {processed} rows in total")

    # Сохраняем ошибочные записи в отдельный файл
    if error_rows:
        error_df = pd.DataFrame(error_rows)
        error_df.to_excel("error_rows.xlsx", index=False)
        print(f"⚠️ {len(error_rows)} rows with errors were saved to error_rows.xlsx")

except Exception as e:
    print("Error:", e)
    sys.exit(1)
finally:
    if "conn" in locals():
        conn.close()
