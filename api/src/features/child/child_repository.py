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