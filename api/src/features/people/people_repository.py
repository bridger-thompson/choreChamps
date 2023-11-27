from src.models.child import Child
from src.services.helper import run_sql


def get_all_children_for_parent(username: str):
    sql = """
        SELECT c.id,
          c.name,
          c.card_color,
          c.points
        FROM child c
        INNER JOIN parent p
            ON (p.id = c.parent_id)
        WHERE p.username = %(username)s
        ORDER BY c.name
    """
    params = {"username": username}
    return run_sql(sql, params, output_class=Child)


def get_childs_points(id: int):
    sql = """
        SELECT *
        FROM child
        WHERE id = %(id)s
    """
    params = {"id": id}
    return run_sql(sql, params, output_class=Child)[0].points


def add_child(child: Child, parent_id: int):
    sql = """
        INSERT INTO child (parent_id, name, card_color, points)
        VALUES (%(parent_id)s, %(name)s, %(color)s, %(points)s)
    """
    params = {
        "parent_id": parent_id,
        "name": child.name,
        "color": child.card_color,
        "points": child.points,
    }
    run_sql(sql, params)


def update_child(child: Child):
    sql = """
        UPDATE child
        SET name = %(name)s,
          points = %(points)s,
          card_color = %(card_color)s
        WHERE id = %(id)s
    """
    params = {
        "name": child.name,
        "points": child.points,
        "card_color": child.card_color,
        "id": child.id,
    }
    run_sql(sql, params)


def delete_child(id: int):
    sql = """
        DELETE FROM child
        WHERE id = %(id)s
    """
    params = {"id": id}
    run_sql(sql, params)


def get_child(id: int):
    sql = """
        SELECT *
        FROM child c
        WHERE c.id = %(id)s
    """
    params = {"id": id}
    return run_sql(sql, params, output_class=Child)[0]


def get_parent_id(username: str):
    sql = """
        SELECT id
        FROM parent p
        WHERE p.username = %(username)s
    """
    params = {"username": username}
    results = run_sql(sql, params)
    if results:
        print(results[0][0])
        return results[0][0]
    return add_parent_and_return_id(username)


def add_parent_and_return_id(username: str):
    sql = """
        INSERT INTO parent (username)
        VALUES (%(username)s)\
        RETURNING id
    """
    params = {"username": username}
    results = run_sql(sql, params)
    return results[0][0]


def user_is_authorized(pin: str, username: str):
    sql = """
        SELECT *
        FROM parent
        WHERE pin = %(pin)s
        AND username = %(username)s
    """
    params = {"pin": pin, "username": username}
    results = run_sql(sql, params)
    if results:
        return True
    return False
