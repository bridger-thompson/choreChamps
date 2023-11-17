from src.models.child import Child
from src.models.prize import Prize
from src.services.helper import run_sql


def get_parents_prizes(parent_id: int):
    sql = """
        SELECT * 
        FROM prize
        WHERE parent_id = %(parent_id)s
    """
    params = {"parent_id": parent_id}
    return run_sql(sql, params, output_class=Prize)


def get_parents_children_with_prize(prize_id: int, parent_id: int):
    sql = """
        SELECT c.*
        FROM child c
        INNER JOIN child_prize cp
            ON (c.id = cp.child_id)
        WHERE c.parent_id = %(parent_id)s
        AND cp.prize_id = %(prize_id)s
    """
    params = {"prize_id": prize_id, "parent_id": parent_id}
    return run_sql(sql, params, output_class=Child)


def add_prize(prize: Prize, parent_id: int):
    sql = """
        INSERT INTO prize (name, description, cost, image_filename, url, parent_id)
        VALUES (%(name)s, %(description)s, %(cost)s, %(image)s, %(url)s, %(parent_id)s)
        RETURNING *
    """
    params = {
        "name": prize.name,
        "description": prize.description,
        "cost": prize.cost,
        "image": prize.image_filename,
        "url": prize.url,
        "parent_id": parent_id,
    }
    return run_sql(sql, params, output_class=Prize)[0]


def update_prize(prize: Prize):
    sql = """
        UPDATE prize
        SET name = %(name)s,
            description = %(description)s,
            cost = %(cost)s,
            image_filename = %(image)s,
            url = %(url)s,
            active = %(active)s
        WHERE id = %(id)s
    """
    params = {
        "name": prize.name,
        "description": prize.description,
        "cost": prize.cost,
        "image": prize.image_filename,
        "url": prize.url,
        "active": prize.active,
        "id": prize.id,
    }
    run_sql(sql, params)


def delete_prize(id: int):
    sql = """
        DELETE FROM prize
        WHERE id = %(id)s
    """
    params = {"id": id}
    run_sql(sql, params)


def assign_prize_to_child(prize_id, child_id):
    sql = """
        INSERT INTO child_prize (child_id, prize_id)
        VALUES (%(child_id)s, %(prize_id)s)
    """
    params = {"child_id": child_id, "prize_id": prize_id}
    run_sql(sql, params)


def unassign_prize(prize_id):
    sql = """
        DELETE FROM child_prize
        WHERE prize_id = %(prize_id)s
    """
    params = {"prize_id": prize_id}
    run_sql(sql, params)
