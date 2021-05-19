import Command from "./command"
import history from "../history"
import { Data, TransformCorner, TransformEdge } from "types"
import { TransformSnapshot } from "state/sessions/transform-session"
import { getShapeUtils } from "lib/shapes"

export default function transformCommand(
  data: Data,
  before: TransformSnapshot,
  after: TransformSnapshot,
  anchor: TransformCorner | TransformEdge
) {
  history.execute(
    data,
    new Command({
      name: "translate_shapes",
      category: "canvas",
      do(data) {
        const {
          type,
          shapeBounds,
          initialBounds,
          currentPageId,
          selectedIds,
          boundsRotation,
        } = after

        const { shapes } = data.document.pages[currentPageId]

        selectedIds.forEach((id) => {
          const { initialShape, initialShapeBounds } = shapeBounds[id]
          const shape = shapes[id]

          getShapeUtils(shape).transform(shape, initialShapeBounds, {
            type,
            initialShape,
            initialShapeBounds,
            initialBounds,
            boundsRotation,
            isFlippedX: false,
            isFlippedY: false,
            isSingle: false,
            anchor,
          })
        })
      },
      undo(data) {
        const {
          type,
          shapeBounds,
          initialBounds,
          currentPageId,
          selectedIds,
          boundsRotation,
        } = before

        const { shapes } = data.document.pages[currentPageId]

        selectedIds.forEach((id) => {
          const { initialShape, initialShapeBounds } = shapeBounds[id]
          const shape = shapes[id]

          getShapeUtils(shape).transform(shape, initialShapeBounds, {
            type,
            initialShape,
            initialShapeBounds,
            initialBounds,
            boundsRotation,
            isFlippedX: false,
            isFlippedY: false,
            isSingle: false,
            anchor: type,
          })
        })
      },
    })
  )
}