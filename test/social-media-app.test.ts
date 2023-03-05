const { ethers } = require("hardhat");
const expect = require("chai").expect;

describe("SocialMedia App", async function () {
  it("should upload post", async function () {
    const contractFactory = await ethers.getContractFactory("SocialMediaApp");
    const contractDeploy = await contractFactory.deploy("Decentragram");

    await contractDeploy.deployed();

    await contractDeploy.uploadPost(
      "3D Image",
      "3D Rendering",
      "Design",
      "30 Dec 2022"
    );

    let postId = await contractDeploy.getPost(1);

    expect(postId[1]).to.equal("3D Image");
  });

  it("should upload comment", async function () {
    const contractFactory = await ethers.getContractFactory("SocialMediaApp");
    const contractDeploy = await contractFactory.deploy("Decentragram");

    await contractDeploy.deployed();

    await contractDeploy.uploadPost(
      "3D Image",
      "3D Rendering",
      "Design",
      "30 Dec 2022"
    );

    let postId = await contractDeploy.getPost(1);

    expect(postId[1]).to.equal("3D Image");

    await contractDeploy.uploadComment(1, "Awesome Design", "30 Dec 2022");
  });
});

export {};