import * as React from 'react'
import { Tooltip } from '~components/Tooltip/Tooltip'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTldrawApp } from '~hooks'
import { styled } from '~styles'
import { AlignType, TDSnapshot, DistributeType, StretchType } from '~types'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  AspectRatioIcon,
  CopyIcon,
  DotsHorizontalIcon,
  GroupIcon,
  LockClosedIcon,
  LockOpen1Icon,
  PinBottomIcon,
  PinTopIcon,
  RotateCounterClockwiseIcon,
  AlignBottomIcon,
  AlignCenterHorizontallyIcon,
  AlignCenterVerticallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  SpaceEvenlyHorizontallyIcon,
  SpaceEvenlyVerticallyIcon,
  StretchHorizontallyIcon,
  StretchVerticallyIcon,
} from '@radix-ui/react-icons'
import { DMContent } from '~components/DropdownMenu'
import { Divider } from '~components/Divider'
import { TrashIcon } from '~components/icons'
import { ToolButton } from '~components/ToolButton'

const selectedShapesCountSelector = (s: TDSnapshot) =>
  s.document.pageStates[s.appState.currentPageId].selectedIds.length

const isAllLockedSelector = (s: TDSnapshot) => {
  const page = s.document.pages[s.appState.currentPageId]
  const { selectedIds } = s.document.pageStates[s.appState.currentPageId]
  return selectedIds.every((id) => page.shapes[id].isLocked)
}

const isAllAspectLockedSelector = (s: TDSnapshot) => {
  const page = s.document.pages[s.appState.currentPageId]
  const { selectedIds } = s.document.pageStates[s.appState.currentPageId]
  return selectedIds.every((id) => page.shapes[id].isAspectRatioLocked)
}

const isAllGroupedSelector = (s: TDSnapshot) => {
  const page = s.document.pages[s.appState.currentPageId]
  const selectedShapes = s.document.pageStates[s.appState.currentPageId].selectedIds.map(
    (id) => page.shapes[id]
  )

  return selectedShapes.every(
    (shape) =>
      shape.children !== undefined ||
      (shape.parentId === selectedShapes[0].parentId &&
        selectedShapes[0].parentId !== s.appState.currentPageId)
  )
}

const hasSelectionClickor = (s: TDSnapshot) => {
  const { selectedIds } = s.document.pageStates[s.appState.currentPageId]
  return selectedIds.length > 0
}

const hasMultipleSelectionClickor = (s: TDSnapshot) => {
  const { selectedIds } = s.document.pageStates[s.appState.currentPageId]
  return selectedIds.length > 1
}

export function ActionButton(): JSX.Element {
  const app = useTldrawApp()

  const isAllLocked = app.useStore(isAllLockedSelector)

  const isAllAspectLocked = app.useStore(isAllAspectLockedSelector)

  const isAllGrouped = app.useStore(isAllGroupedSelector)

  const hasSelection = app.useStore(hasSelectionClickor)

  const hasMultipleSelection = app.useStore(hasMultipleSelectionClickor)

  const handleRotate = React.useCallback(() => {
    app.rotate()
  }, [app])

  const handleDuplicate = React.useCallback(() => {
    app.duplicate()
  }, [app])

  const handleToggleLocked = React.useCallback(() => {
    app.toggleLocked()
  }, [app])

  const handleToggleAspectRatio = React.useCallback(() => {
    app.toggleAspectRatioLocked()
  }, [app])

  const handleGroup = React.useCallback(() => {
    app.group()
  }, [app])

  const handleMoveToBack = React.useCallback(() => {
    app.moveToBack()
  }, [app])

  const handleMoveBackward = React.useCallback(() => {
    app.moveBackward()
  }, [app])

  const handleMoveForward = React.useCallback(() => {
    app.moveForward()
  }, [app])

  const handleMoveToFront = React.useCallback(() => {
    app.moveToFront()
  }, [app])

  const handleDelete = React.useCallback(() => {
    app.delete()
  }, [app])

  const alignTop = React.useCallback(() => {
    app.align(AlignType.Top)
  }, [app])

  const alignCenterVertical = React.useCallback(() => {
    app.align(AlignType.CenterVertical)
  }, [app])

  const alignBottom = React.useCallback(() => {
    app.align(AlignType.Bottom)
  }, [app])

  const stretchVertically = React.useCallback(() => {
    app.stretch(StretchType.Vertical)
  }, [app])

  const distributeVertically = React.useCallback(() => {
    app.distribute(DistributeType.Vertical)
  }, [app])

  const alignLeft = React.useCallback(() => {
    app.align(AlignType.Left)
  }, [app])

  const alignCenterHorizontal = React.useCallback(() => {
    app.align(AlignType.CenterHorizontal)
  }, [app])

  const alignRight = React.useCallback(() => {
    app.align(AlignType.Right)
  }, [app])

  const stretchHorizontally = React.useCallback(() => {
    app.stretch(StretchType.Horizontal)
  }, [app])

  const distributeHorizontally = React.useCallback(() => {
    app.distribute(DistributeType.Horizontal)
  }, [app])

  const selectedShapesCount = app.useStore(selectedShapesCountSelector)

  const hasTwoOrMore = selectedShapesCount > 1
  const hasThreeOrMore = selectedShapesCount > 2

  return (
    <DropdownMenu.Root dir="ltr">
      <DropdownMenu.Trigger dir="ltr" asChild>
        <ToolButton variant="circle">
          <DotsHorizontalIcon />
        </ToolButton>
      </DropdownMenu.Trigger>
      <DMContent sideOffset={16}>
        <>
          <ButtonsRow>
            <ToolButton variant="icon" disabled={!hasSelection} onClick={handleDuplicate}>
              <Tooltip label="Duplicate" kbd={`#D`}>
                <CopyIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleRotate}>
              <Tooltip label="Rotate">
                <RotateCounterClockwiseIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleToggleLocked}>
              <Tooltip label="Toogle Locked" kbd={`#L`}>
                {isAllLocked ? <LockClosedIcon /> : <LockOpen1Icon opacity={0.4} />}
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleToggleAspectRatio}>
              <Tooltip label="Toogle Aspect Ratio Lock">
                <AspectRatioIcon opacity={isAllAspectLocked ? 1 : 0.4} />
              </Tooltip>
            </ToolButton>
            <ToolButton
              disabled={!hasSelection || (!isAllGrouped && !hasMultipleSelection)}
              onClick={handleGroup}
            >
              <Tooltip label="Group" kbd={`#G`}>
                <GroupIcon opacity={isAllGrouped ? 1 : 0.4} />
              </Tooltip>
            </ToolButton>
          </ButtonsRow>
          <ButtonsRow>
            <ToolButton disabled={!hasSelection} onClick={handleMoveToBack}>
              <Tooltip label="Move to Back" kbd={`#⇧[`}>
                <PinBottomIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleMoveBackward}>
              <Tooltip label="Move Backward" kbd={`#[`}>
                <ArrowDownIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleMoveForward}>
              <Tooltip label="Move Forward" kbd={`#]`}>
                <ArrowUpIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleMoveToFront}>
              <Tooltip label="More to Front" kbd={`#⇧]`}>
                <PinTopIcon />
              </Tooltip>
            </ToolButton>
            <ToolButton disabled={!hasSelection} onClick={handleDelete}>
              <Tooltip label="Delete" kbd="⌫">
                <TrashIcon />
              </Tooltip>
            </ToolButton>
          </ButtonsRow>
          <Divider />
          <ButtonsRow>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignLeft}>
              <AlignLeftIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignCenterHorizontal}>
              <AlignCenterHorizontallyIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignRight}>
              <AlignRightIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={stretchHorizontally}>
              <StretchHorizontallyIcon />
            </ToolButton>
            <ToolButton disabled={!hasThreeOrMore} onClick={distributeHorizontally}>
              <SpaceEvenlyHorizontallyIcon />
            </ToolButton>
          </ButtonsRow>
          <ButtonsRow>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignTop}>
              <AlignTopIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignCenterVertical}>
              <AlignCenterVerticallyIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={alignBottom}>
              <AlignBottomIcon />
            </ToolButton>
            <ToolButton disabled={!hasTwoOrMore} onClick={stretchVertically}>
              <StretchVerticallyIcon />
            </ToolButton>
            <ToolButton disabled={!hasThreeOrMore} onClick={distributeVertically}>
              <SpaceEvenlyVerticallyIcon />
            </ToolButton>
          </ButtonsRow>
        </>
      </DMContent>
    </DropdownMenu.Root>
  )
}

export const ButtonsRow = styled('div', {
  position: 'relative',
  display: 'flex',
  width: '100%',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 0,
})