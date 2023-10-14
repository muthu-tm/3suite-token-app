import React from "react";
import { useRouter } from "next/router";

function MainActivity() {
  const router = useRouter();

  return (
    <div className="activity-sec">
      <div className="Heading">Activity Page</div>

      <div className="user-activity">
        <div className="single-act-card">
          <div className="sp-head">Tokens Created</div>
          <div className="sp-desc">
            {" "}
            You can all view your minted token here by clicking on view activity
            below.
          </div>
          <div
            className="sp-cta"
            onClick={() =>
              router.push({
                pathname: "/view-activity",
                query: { tab: "Token Minting" },
              })
            }
          >
            <div>View Activity</div>
          </div>
        </div>
        <div className="single-act-card">
          <div className="sp-head">Multisender/Airdrop</div>
          <div className="sp-desc">
            {" "}
            You can all view your Airdrops or Multisender here by clicking on
            view activity below.
          </div>
          <div
            className="sp-cta"

            onClick={() =>
              router.push({
                pathname: "/view-activity",
                query: { tab: "Multisender" },
              })
            }
         
          >
            <div>View Activity </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainActivity;
