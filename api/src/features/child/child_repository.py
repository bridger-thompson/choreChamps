from src.models.child import Child
from src.services.helper import run_sql


def get_all_children_for_parent(parent_id: int):
    sql = """
        SELECT id,
          name,
          card_color,
          points
        FROM child
        WHERE parent_id = %(parent_id)s
    """
    params = {"parent_id": parent_id}
    return run_sql(sql, params, output_class=Child)


def get_child(id: int):
    sql = """
        SELECT *
        FROM child
        WHERE id = %(id)s
    """
    params = {"id": id}
    return run_sql(sql, params, output_class=Child)[0]


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
