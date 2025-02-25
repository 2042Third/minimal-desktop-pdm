<script>
  import TreemapNode from './TreemapNode.svelte';

  let {data: data} = $props();
  let width = 800;
  let height = 600;

  // Ensure root node has valid size
  const validatedData = $derived({
    ...data,
    size: Math.max(data.size, 1)
  });
</script>

<div class="container">
  <svg {width} {height}>
    <TreemapNode
      node={validatedData}
      x={0}
      y={0}
      width={width}
      height={height}
      depth={0}
    />
<!--    <rect-->
<!--      width={width}-->
<!--      height={height}-->
<!--      fill="none"-->
<!--      stroke="red"-->
<!--      stroke-width="2"-->
<!--    />-->
  </svg>
</div>

<style>
    .container {
        /*border: 1px solid #ccc;*/
        overflow: hidden;
        resize: both;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    rect {
        transition: all 0.2s ease;
    }
    .treemap text {
        pointer-events: none;
        user-select: none;
    }

    .treemap rect:hover {
        stroke: black;
        stroke-width: 2;
    }
</style>