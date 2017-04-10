        function drawGraph(graph, canvasId) {

          // Deciding the place of the nodes, and put them in points

          var canvas = document.getElementById(canvasId);
          var context = canvas.getContext('2d');
          var width = canvas.width;
          var height = canvas.height;

          var centerX = width / 2;
          var centerY = height / 2;
          radius = 20;

          var pointsNo = graph.nodes.length;
          var points = [];
          var rotateAngle = Math.PI * 2 / pointsNo;
          var rotateRadius = 0.85 * Math.min(width, height) / 2;

          var currentAngle = Math.PI / 2;

          for(i = 0; i < pointsNo; i++) {
            var x = centerX - rotateRadius * Math.sin(currentAngle);
            var y = centerY - rotateRadius * Math.cos(currentAngle);
            points.push([x, y]);
            currentAngle -= rotateAngle;
          }

          // Draw edges

          for(i = 0; i < graph.edges.length; i++) {
            // Edge line
            edge = graph.edges[i];
            var x1 = points[edge[0]][0];
            var y1 = points[edge[0]][1];
            var x2 = points[edge[1]][0];
            var y2 = points[edge[1]][1];
            context.strokeStyle = edge[3] ? 'red' : '#777';
            context.lineWidth = edge[3] ? 4 : 1;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            var x3 = (x1 + x2) / 2;
            var y3 = (y1 + y2) / 2;

            // Edge circle
            context.beginPath();
            context.arc(x3, y3, 15, 0, 2 * Math.PI, false);
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#fff';
            context.stroke();

            // Edge text
            context.fillStyle = 'black';
            var font = "bold " + "14px Arial";
            context.font = font;
            context.strokeStyle = '#FFF';
            context.fillText(edge[2].toString(), x3 - 4, y3 + 6);
          }

          // Drawing Nodes
          for (i = 0; i < graph.nodes.length; i++) {
            // Node circle
            node = graph.nodes[i];
            var center_node = (graph.center_node == i);
            var x = points[i][0];
            var y = points[i][1];
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = graph.highlight.indexOf(i) > -1 ? 'red' : 'green';
            if (center_node)
              context.fillStyle = 'yellow';
            context.fill();
            context.lineWidth = center_node ? 4 : 2;
            context.strokeStyle = '#003300';
            context.stroke();

            // Node text
            context.fillStyle = center_node ? 'black' : 'white';
            var font = "bold " + "18px Arial";
            context.font = font;
            context.strokeStyle = '#FFF';
            context.fillText(node, x - 4 ,y + 6);
          }
        }

