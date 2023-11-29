from src.models.child import Child
from src.models.chore import Chore
from src.services.helper import run_sql


def get_all_chores_for_parent(parent_id: int):
    sql = """
        SELECT *
        FROM chore
        WHERE parent_id = %(parent_id)s
        ORDER BY name
    """
    params = {"parent_id": parent_id}
    return run_sql(sql, params, output_class=Chore)


def add_chore(chore: Chore):
    sql = """
        INSERT INTO chore (name, description, points, days_of_week, parent_id)
        VALUES (%(name)s, %(description)s, %(points)s, %(days)s, %(parent_id)s)
        RETURNING *
    """
    params = {
        "name": chore.name,
        "description": chore.description,
        "points": chore.points,
        "days": chore.days_of_week,
        "parent_id": chore.parent_id,
    }
    return run_sql(sql, params, output_class=Chore)[0]


def update_chore(updated_chore: Chore):
    sql = """
        UPDATE chore
        SET name = %(name)s,
          description = %(description)s,
          points = %(points)s,
          days_of_week = %(days)s
        WHERE id = %(id)s
    """
    params = {
        "name": updated_chore.name,
        "description": updated_chore.description,
        "points": updated_chore.points,
        "days": updated_chore.days_of_week,
        "id": updated_chore.id,
    }
    run_sql(sql, params)


def delete_chore(id: int):
    sql = """
        DELETE FROM chore
        WHERE id = %(id)s
    """
    params = {"id": id}
    run_sql(sql, params)


def get_parents_children_with_chore(chore_id: int, username: str):
    sql = """
        SELECT c.id,
          c.name,
          c.card_color,
          c.points
        FROM child_assignment a
        INNER JOIN child c
          ON (a.child_id = c.id)
        INNER JOIN parent p
          ON (p.id = c.parent_id)
        WHERE a.chore_id = %(chore_id)s
        AND p.username = %(username)s
    """
    params = {"chore_id": chore_id, "username": username}
    return run_sql(sql, params, output_class=Child)


def assign_chore_to_child(chore_id: int, child_id: int):
    sql = """
        INSERT INTO child_assignment (child_id, chore_id)
        VALUES (%(child_id)s, %(chore_id)s)
    """
    params = {"child_id": child_id, "chore_id": chore_id}
    run_sql(sql, params)


def unassign_chore(chore_id: int):
    sql = """
        DELETE FROM child_assignment
        WHERE chore_id = %(chore_id)s
    """
    params = {
        "chore_id": chore_id,
    }
    run_sql(sql, params)
