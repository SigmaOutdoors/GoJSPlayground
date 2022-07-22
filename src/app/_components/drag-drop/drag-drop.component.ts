import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input, Output, ViewChild, NgZone, } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import produce from 'immer';
@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})

// based off of https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/draggableLink.html

// https://gojs.net/latest/intro/angular.html

// Dependent on BOTH of these  npm packages
// https://www.npmjs.com/package/gojs-angular
// https://www.npmjs.com/package/gojs
// To install the latest versions I had to specifically install them.
// npm install gojs-angular@2.0.4
// npm install gojs@2.2.13


export class DragDropComponent implements OnInit {



  public state = {
    // Diagram state props
    diagramNodeData: [
      { id: 'Alpha', text: "Alpha", color: 'lightblue' },
      { id: 'Beta', text: "Beta", color: 'orange' }
    ],
    diagramLinkData: [
      { key: -1, from: 'Alpha', to: 'Beta' }
    ],
    diagramModelData: { prop: 'value' },
    skipsDiagramUpdate: false,

    // Palette state props
    paletteNodeData: [
      { key: 'PaletteNode1', color: 'orange' },
      { key: 'PaletteNode2', color: 'blue' }
    ]
  }; // end state object





  @ViewChild('myDiagramDiv', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPaletteDiv', { static: true }) public myPallete: PaletteComponent;

  public goObject = go;
  public diagramDivClassName: string = 'myDiagramDiv';

  palletteDivClassName: string = 'myPaletteDiv';

  constructor(private cdr: ChangeDetectorRef) {

    console.log("In Constructor of DragDrop()");

    this.initDiagram = this.initDiagram.bind(this);
    this.initPalette = this.initPalette.bind(this);

  }

  ngOnInit(): void {


  }

  public initPalette(): go.Palette {

    console.log("In InitPalette()");

    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    // define the Node template
    palette.nodeTemplate =
      $(go.Node, 'Auto',
        { fromSpot: go.Spot.Right, toSpot: go.Spot.Left },   // port properties on the node

        $(go.Shape, 'RoundedRectangle', { stroke: null },
          new go.Binding('fill', 'color')
        ),
        $(go.TextBlock, { margin: 8 },
          new go.Binding('text', 'key'))
      );

    palette.model = new go.GraphLinksModel(
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      });




    palette.linkTemplate = // simplify the link template, just in this Palette
      $(go.Link,
        { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
          // to line up the Link in the same manner we have to pretend the Link has the same location spot
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:
            $(go.Adornment, "Link",
              { locationSpot: go.Spot.Center },
              $(go.Shape,
                { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
              $(go.Shape,  // the arrowhead
                { toArrow: "Standard", stroke: null })
            )
        },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points"),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "Standard", stroke: null })
      );


    return palette;


  }



  // initialize diagram / templates
  public initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      "linkingTool.isUnconnectedLinkValid": true,
      "linkingTool.portGravity": 20,
      "relinkingTool.isUnconnectedLinkValid": true,
      "relinkingTool.portGravity": 20,

      grid: $(go.Panel, "Grid",
        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
      ),


      model: new go.GraphLinksModel(
        {
          nodeKeyProperty: 'id',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Auto',
        { fromSpot: go.Spot.Right, toSpot: go.Spot.Left },   // port properties on the node
        $(go.Shape, 'RoundedRectangle', { stroke: null },
          new go.Binding('fill', 'color')
        ),
        $(go.TextBlock, { margin: 8, editable: true },
          new go.Binding('text').makeTwoWay())
      );
    return dia;
  }


}



/*

public OLDinitDiagramLD(): go.Diagram {
console.log("In initDiagram()");

const self = this;
const $ = go.GraphObject.make;


const dia =
  $(go.Diagram, // NO for angular?? "myDiagramDiv",  // must name or refer to the DIV HTML element
    {
      grid: $(go.Panel, "Grid",
        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
      ),
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      "linkingTool.isUnconnectedLinkValid": true,
      "linkingTool.portGravity": 20,
      "relinkingTool.isUnconnectedLinkValid": true,
      "relinkingTool.portGravity": 20,
      "relinkingTool.fromHandleArchetype":
        $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
      "relinkingTool.toHandleArchetype":
        $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
      "linkReshapingTool.handleArchetype":
        $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
      "rotatingTool.handleAngle": 270,
      "rotatingTool.handleDistance": 30,
      "rotatingTool.snapAngleMultiple": 15,
      "rotatingTool.snapAngleEpsilon": 15,
      "undoManager.isEnabled": true
    });


return dia;

}


 
// This file holds definitions of all standard shape figures -- string values for Shape.figure.
// You do not need to load this file in order to use named Shape figure.

// The following figures are built-in to the go.js library and thus do not need to be redefined:
//   Rectangle, Square, RoundedRectangle, Border, Ellipse, Circle,
//   TriangleRight, TriangleDown, TriangleLeft, TriangleUp, Triangle,
//   LineH, LineV, None, BarH, BarV, MinusLine, PlusLine, XLine
// If you need any of the other figures that are defined in this file, we suggest that you copy
// just those definitions into your own code.  Do not load this file unless you really want to
// define a lot of code that your app does not use and will not get garbage-collected.


    const pally =    $(go.Palette, // No for angular?? "myPaletteDiv",  // must name or refer to the DIV HTML element
    {
 
      maxSelectionCount: 1,
      nodeTemplateMap: this.myDiagramComponent.diagram.nodeTemplateMap,  // share the templates used by myDiagram
      linkTemplate: // simplify the link template, just in this Palette
        $(go.Link,
          { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
            // to line up the Link in the same manner we have to pretend the Link has the same location spot
            locationSpot: go.Spot.Center,
            selectionAdornmentTemplate:
              $(go.Adornment, "Link",
                { locationSpot: go.Spot.Center },
                $(go.Shape,
                  { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                $(go.Shape,  // the arrowhead
                  { toArrow: "Standard", stroke: null })
              )
          },
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4
          },
          new go.Binding("points"),
          $(go.Shape,  // the link path shape
            { isPanelMain: true, strokeWidth: 2 }),
          $(go.Shape,  // the arrowhead
            { toArrow: "Standard", stroke: null })
        ),
      model: new go.GraphLinksModel([  // specify the contents of the Palette
        { text: "Start", figure: "Ellipse", "size":"75 75", fill: "#00AD5F" },
        { text: "Step" },
        { text: "DB", figure: "Database", fill: "lightgray" },
        { text: "???", figure: "Diamond", fill: "lightskyblue" },
        { text: "End", figure: "Ellipse", "size":"75 75", fill: "#CE0620" },
        { text: "Comment", figure: "RoundedRectangle", fill: "lightyellow" }
      ], [
          // the Palette also has a disconnected Link, which the user can drag-and-drop
          { points: new go.List(
            // go.Point
            ).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
        ])
});
 
 
    return pally;
 
    */