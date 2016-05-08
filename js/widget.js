var canvas,ctx,tim;
canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
baum();

function baum(){
    var a,b,c,d,e,x,y,r;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle="rgb(222,236,223)";
    // ctx.fillStyle="rgb(100,100,100)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    tim=new Date().getTime()/31;

    c=[];
    r=tim/32;
    for(a=0;a<14;a++){
        b=200;
        if(a%2==1)b=130;
        x=Math.cos(r)*b;
        y=Math.sin(r)*b;
        c.push([200+x,200+y]);
        r+=Math.PI*2/14;
    }

    for(a=0;a<7;a++){
        b=c[a*2];
        d=c[a*2+1];
        e=c[(a*2+13)%14];
        tri([[200,200],b,d],0);
        tri([[200,200],b,e],0);
    }
    requestAnimationFrame(baum);
}

function tri(p,ban){
    var a,b,c,d,e,f,x,y,han,r1,r2;
    x=y=0;
    for(a=0;a<3;a++){
        x+=p[a][0];
        y+=p[a][1];
    }
    x=x/3-canvas.width/2;
    y=y/3-canvas.height/2;
    han=Math.pow(x*x+y*y,0.5);
    r1=0.6+Math.sin(han/20*(1+Math.sin(tim/19)*0.7)+tim/41)*0.05;
    r2=1-r1;
    c=p[0][0]*(p[1][1]-p[2][1]);
    c+=p[1][0]*(p[2][1]-p[0][1]);
    c+=p[2][0]*(p[0][1]-p[1][1]);
    c=Math.abs(c);

    if(c<1000){
        if(ban%5==1){
            a=((han+tim*3)%360)|0;
            ctx.fillStyle=ctx.strokeStyle="hsla("+a+",60%,60%,0.6)";
            ctx.beginPath();
            for(a=0;a<p.length;a++){
                b=p[a];
                ctx.lineTo(b[0],b[1]);
            }
            ctx.fill();
            if(Math.random()<0.3)return;
        }
        if(ban%11>8)return;
        if(c<20)return;
    }

    d=0;
    for(a=0;a<p.length;a++){
        b=p[a];
        c=p[(a+1)%p.length];
        x=b[0]-c[0];
        y=b[1]-c[1];
        e=Math.pow(x*x+y*y,0.5);
        if(e>d){
            d=e;
            f=a;
        }
    }

    a=p[f];
    b=p[(f+1)%p.length];
    c=p[(f+2)%p.length];
    x=a[0]*r1+b[0]*r2;
    y=a[1]*r1+b[1]*r2;
    tri([b,c,[x,y]],ban+1);
    tri([c,a,[x,y]],ban+4);
}