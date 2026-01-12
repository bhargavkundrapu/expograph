export default function Skeleton({ 
  className = "", 
  variant = "default",
  animation = "shimmer",
  rounded = "lg"
}) {
  return (
    <div />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div>
      <div>
        <Skeleton variant="icon" />
        <div>
          <Skeleton variant="title" />
          <Skeleton variant="textShort" />
        </div>
      </div>
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="textShort" />
      </div>
    </div>
  );
}

export function SkeletonPage({ className = "" }) {
  return (
    <div>
      <div>
        <div>
          <Skeleton variant="icon" />
          <div>
            <Skeleton rounded="xl" />
            <Skeleton rounded="lg" />
          </div>
        </div>
      </div>
      <div>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
