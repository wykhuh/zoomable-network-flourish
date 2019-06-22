const LAYOUT_PADDING = 50;
const ANIMATION_DURATION = 500;
const EASING = "linear";

const fcoseOptions = {
  name: "fcose",
  quality: "default",
  nodeDimensionsIncludeLabels: false,
  animate: true,
  fit: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 100000,
  // Ideal edge (non nested) length
  idealEdgeLength: 100,
  // Divisor to compute edge forces
  edgeElasticity: 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 0.25,
  // Maximum number of iterations to perform
  numIter: 2500,
  // For enabling tiling
  tile: false,
  // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingVertical: 10,
  // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.3
};

const coseOptions = {
  name: "cose",
  idealEdgeLength: 80,
  nodeOverlap: 20,
  refresh: 20,
  fit: true,
  padding: LAYOUT_PADDING,
  randomize: false,
  componentSpacing: 100,
  nodeRepulsion: 40000,
  edgeElasticity: 100,
  nestingFactor: 5,
  gravity: 80,
  numIter: 1000,
  initialTemp: 200,
  coolingFactor: 0.95,
  minTemp: 1.0,
  nodeDimensionsIncludeLabels: false
};

const concentricOptions = {
  name: "concentric",
  fit: true,
  animate: true,
  ANIMATION_DURATION: ANIMATION_DURATION,
  animationEasing: EASING,
  nodeDimensionsIncludeLabels: true,
  avoidOverlap: true,
  padding: LAYOUT_PADDING,
  levelWidth: () => 1,
  concentric: () => 1
};

export { coseOptions, fcoseOptions, concentricOptions };
